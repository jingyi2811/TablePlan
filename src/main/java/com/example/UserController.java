package com.example;


import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

	@RequestMapping("/")
    public String user(Map<String, Object> model) {
    	model.put("message", "message");
    	return "test";
    }
	
	

}