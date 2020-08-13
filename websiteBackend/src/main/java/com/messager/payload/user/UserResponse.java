package com.messager.payload.user;

import com.messager.model.User;

public class UserResponse {
    private Long id;
    private String username;
    private String name;
    private String phone;
    private String email;
    private String city;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.city = user.getCity();
    }

    public UserResponse(Long id, String username, String name, String phone, String email) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

