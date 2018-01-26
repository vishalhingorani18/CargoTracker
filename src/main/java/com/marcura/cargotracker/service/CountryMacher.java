package com.marcura.cargotracker.service;

import com.microsoft.sqlserver.jdbc.SQLServerException;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import me.xdrop.fuzzywuzzy.algorithms.WeightedRatio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import springfox.documentation.annotations.Cacheable;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class CountryMacher {

    public static class CountryPort {
        public String countryName;
        public String countryCode;
        public String portName;
    }


    private List<String> ports = new LinkedList<>();
    private Map<String, String> knownDest = new HashMap();
    private Map<String, CountryPort> portsCountries = new HashMap<>();
    @Autowired
    private JdbcTemplate jdbcTemplate;


    private final static String query = "select l.name as portName, " +
            "c.iso2code as countryCode, c.name as countryName " +
            "from PORTS p join countries c on c.id = p.country_id join locations l on l.id = p.id";


    private final static String queryDestinations = "select distinct upper(DESTINATION) as DESTINATION," +
            " upper(DESTINATION_TIDED) as DESTINATION_TIDED " +
            "from VESSEL_POSITION_UPDATE_ITEMS where DESTINATION is not null and DESTINATION_TIDED is not null";


    private final static String histTidedQuery = "select top 1  upper(DESTINATION_TIDED) as DESTINATION_TIDED " +
    "from VESSEL_POSITION_UPDATE_ITEMS where upper(DESTINATION)  = '%s'";

    @PostConstruct
    private void readPorts() {
        SqlRowSet portsRS = jdbcTemplate.queryForRowSet(query);
        while (portsRS.next()) {
            ports.add(portsRS.getString("portName").toUpperCase());
            CountryPort cp = new CountryPort();
            cp.countryCode = portsRS.getString("countryCode");
            cp.countryName = portsRS.getString("countryName");
            cp.portName = portsRS.getString("portName");
            portsCountries.put(cp.portName.toUpperCase(), cp);
        }

     /*   SqlRowSet destRS = jdbcTemplate.queryForRowSet(queryDestinations);
        while (destRS.next()){
            knownDest.put(destRS.getString(0), destRS.getString(1));
        }*/
    }


    @Cacheable("countries")
    public CountryPort fuzzyGetCountry(String p) {
        if (portsCountries.get(p.toUpperCase()) != null) {
            return portsCountries.get(p.toUpperCase());
        }

        String bestMatch = FuzzySearch.extractTop(p, ports, new WeightedRatio(), 1).get(0).getString();
        return portsCountries.get(bestMatch);
    }

    @Cacheable("dest")
    public String getDestTided(String p){
          SqlRowSet destRS = jdbcTemplate.queryForRowSet(String.format(histTidedQuery, p));
           if (destRS.first()) {

               return destRS.getString(1);
           } else return null;

    }
}
