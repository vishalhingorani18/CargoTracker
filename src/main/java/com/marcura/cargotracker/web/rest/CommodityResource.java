package com.marcura.cargotracker.web.rest;

import com.marcura.cargotracker.domain.Commodity;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

/**
 * REST controller for getting the audit events.
 */
@RestController
@RequestMapping("/api/commodity")
public class CommodityResource {


    JSONObject object=new JSONObject();

    /**
     * GET  /audits : get a page of AuditEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of AuditEvents in body
     */
    @GetMapping()
    @ResponseBody
    public List<Commodity> getCommodity() {

      List<Commodity> list=new LinkedList<>();

      Commodity c=new Commodity();
      c.setId("200");
      c.setName("Iron Ore");

      list.add(c);

       return list;
    }

}
