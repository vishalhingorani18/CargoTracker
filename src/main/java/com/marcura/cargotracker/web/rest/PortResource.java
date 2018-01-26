package com.marcura.cargotracker.web.rest;

import com.marcura.cargotracker.domain.Port;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/api/port")
public class PortResource {

    JSONObject object=new JSONObject();

    private final Logger log = LoggerFactory.getLogger(PortResource.class);

    /**
     * GET  /audits : get a page of AuditEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of AuditEvents in body
     */
    @GetMapping()
    @ResponseBody
    public List<Port> getPort() {

        List<Port> data=new LinkedList<>();

          Port p=new Port();
          p.setId("100");
          p.setName("Port Hedland");

          data.add(p);

        return data;
    }


}
