package com.marcura.cargotracker.web.rest;

import com.marcura.cargotracker.service.CountryMacher;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * REST controller for getting the audit events.
 */
@RestController
@RequestMapping("/api/data")
public class DataResource {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Autowired
    private CountryMacher countryMacher;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;


    /**
     * GET  /audits : get a page of AuditEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of AuditEvents in body
     */

    @GetMapping()
    public @ResponseBody
    HttpEntity<byte[]> getData(@RequestParam(required = false) Long from, @RequestParam(required = false) Long to, @RequestParam(required = false) String commodityId, @RequestParam(required = false) String portId, @RequestParam(required = false) String interval) throws IOException {

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String from_date = df.format(from);
        String to_date = df.format(to);

        String query=null;
        InputStream inputStream=null;


        try {
            inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "query.sql");
        }

        catch (FileNotFoundException e){
            if (inputStream == null) {
                inputStream = this.getClass().getClassLoader().getResourceAsStream("query.sql");
            }

        }

        query = IOUtils.toString(inputStream);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("from_date", from_date);
        params.addValue("to_date", to_date);
        SqlRowSet sqlRowSet = namedParameterJdbcTemplate.queryForRowSet(query, params);


        SqlRowSetMetaData meta = sqlRowSet.getMetaData();
        final ByteArrayOutputStream outB = new ByteArrayOutputStream();
        try (Writer out = new BufferedWriter(new OutputStreamWriter(outB));) {
            CSVPrinter csvPrinter = new CSVPrinter(out, CSVFormat.EXCEL.withHeader());

            int numberOfColumns = meta.getColumnCount();

            for (int i = 1; i < numberOfColumns + 1; i++) {
                csvPrinter.print(meta.getColumnName(i));
            }
            csvPrinter.print("countryName");
            csvPrinter.print("countryCode");
            csvPrinter.println();

            List<List<String>> data = new LinkedList();
            Map<String, String> knownTidedDest = new HashMap<>();

            while (sqlRowSet.next()) {
                String portTided = sqlRowSet.getString("DESTINATION_TIDED");
                String port = sqlRowSet.getString("DESTINATION");
                if (!StringUtils.isEmpty(port) && !StringUtils.isEmpty(portTided)) {
                    knownTidedDest.put(port, portTided);
                }

                List<String> row = new ArrayList<>();
                for (int i = 1; i < numberOfColumns + 1; i++) {
                    row.add(sqlRowSet.getString(i));
                }
                data.add(row);
            }

            for (List<String> r : data) {
                if (r.get(17) == null) {
                    r.set(17, knownTidedDest.get(r.get(16)));
                }
                if (r.get(17) != null) {
                    CountryMacher.CountryPort country = countryMacher.fuzzyGetCountry(r.get(17));
                    r.add( country == null ? "" : country.countryName);
                    r.add( country == null ? "" : country.countryCode);
                    // csvPrinter.print(country == null ? "" : country);
                }
            }
            csvPrinter.printRecords(data);

        } catch (Exception e) {
            e.printStackTrace();
        }
        byte[] doc = outB.toByteArray();
        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "csv"));
        header.set("Content-Disposition", "inline; filename=" + "data.csv");
        header.setContentLength(doc.length);
        return new HttpEntity<>(doc, header);
    }
}


