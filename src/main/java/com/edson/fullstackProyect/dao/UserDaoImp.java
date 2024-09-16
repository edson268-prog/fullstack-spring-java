package com.edson.fullstackProyect.dao;

import com.edson.fullstackProyect.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<User> getUsers() {
        String query = "FROM User";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(Long id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }

    @Override
    public void register(User user) {
        entityManager.merge(user);
    }

    @Override
    public User getUserByCredentials(User user) {
        String query = "FROM User WHERE email = :email";
        List<User> list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();

        if(list.isEmpty()) {
            return null;
        }

        String passwordHashed = list.getFirst().getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, user.getPassword())) {
            return list.getFirst();
        }
        return null;
    }

    @Override
    public User getUserById(Long id) {
        String query = "FROM User WHERE id = :id";
        List<User> list = entityManager.createQuery(query)
                .setParameter("id", id)
                .getResultList();
        if(list.isEmpty()) {
            return null;
        }
        return list.getFirst();
    }
}
