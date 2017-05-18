package com.example;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class VideoController {

    @RequestMapping("/video")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}