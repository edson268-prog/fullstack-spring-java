package com.edson.fullstackProyect.controllers;

import com.edson.fullstackProyect.dao.UserDao;
import com.edson.fullstackProyect.models.User;
import com.edson.fullstackProyect.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/user/{id}")
    public User getUser(@PathVariable Long id){
        User user = new User();
        user.setId(id);
        user.setName("Edson");
        user.setLastName("Ibanez");
        user.setEmail("edson26web@gmail.com");
        user.setPhone("67099259");
        return user;
    }

    @RequestMapping(value = "api/users")
    public List<User> getUsers(@RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) { return null; }
        return userDao.getUsers();
    }

    private boolean validateToken(String token) {
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        userDao.register(user);
    }

    @RequestMapping(value = "user444354")
    public User editUser(){
        User user = new User();
        user.setName("Edson");
        user.setLastName("Ibanez");
        user.setEmail("edson26web@gmail.com");
        user.setPhone("78569995");
        return user;
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id) {
        if (validateToken(token)) { return; }
        userDao.delete(id);
    }
}
