package com.edson.fullstackProyect.controllers;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public class TestController {
    @RequestMapping(value = "test")
    public List<String> test(){
        return List.of("Apple", "Banana", "Orange", "Grape", "Pineapple");
    }
}
