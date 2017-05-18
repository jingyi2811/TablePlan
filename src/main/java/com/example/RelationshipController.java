package com.example;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RelationshipController {

    @RequestMapping("/relationship")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}