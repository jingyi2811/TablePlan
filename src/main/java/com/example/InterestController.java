package com.example;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class InterestController {

    @RequestMapping("/interest")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}