package com.edson.fullstackProyect.controllers;

import com.edson.fullstackProyect.dao.UserDao;
import com.edson.fullstackProyect.models.User;
import com.edson.fullstackProyect.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthController {
    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody User user) {
        User userLogged = userDao.getUserByCredentials(user);

        if (userLogged != null) {
            return jwtUtil.create(String.valueOf(userLogged.getId()), userLogged.getEmail());
        }
        return "FAIL";
    }
}
