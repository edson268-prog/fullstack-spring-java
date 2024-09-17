package com.edson.fullstackProyect.dao;

import com.edson.fullstackProyect.models.User;

import java.util.List;

public interface UserDao {
    List<User> getUsers();

    void delete(Long id);

    void register(User user);

    User getUserByCredentials(User user);

    User getUserById(Long id);

    void update(User existingUser);
}
