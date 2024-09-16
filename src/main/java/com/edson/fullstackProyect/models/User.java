package com.edson.fullstackProyect.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Getter @Setter @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter @Column(name = "name")
    private String name;

    @Getter @Setter @Column(name = "last_name")
    private String lastName;

    @Getter @Setter @Column(name = "email")
    private String email;

    @Getter @Setter @Column(name = "type")
    private String type;

    @Getter @Setter @Column(name = "phone")
    private String phone;

    @Getter @Setter @Column(name = "password")
    private String password;
}
