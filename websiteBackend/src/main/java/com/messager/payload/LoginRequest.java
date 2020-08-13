package com.messager.payload;

import javax.validation.constraints.NotBlank;


public class LoginRequest {
    @NotBlank
    private String phone;

    @NotBlank
    private String password;

    public String getPhone()
    {
        return phone;
    }

    public void setPhone(String phone)
    {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
