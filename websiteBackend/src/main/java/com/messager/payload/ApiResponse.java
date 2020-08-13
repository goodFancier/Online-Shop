package com.messager.payload;


import java.util.Date;

public class ApiResponse {
    private Boolean success;
    private String message;
    private Date date;
    private Object object;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(Boolean success, String message, Date date) {
        this.success = success;
        this.message = message;
        this.date = date;
    }

    public ApiResponse(Boolean success, String message, Date date, Object object) {
        this.success = success;
        this.message = message;
        this.date = date;
        this.object = object;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public Object getObject()
    {
        return object;
    }

    public void setObject(Object object)
    {
        this.object = object;
    }
}
