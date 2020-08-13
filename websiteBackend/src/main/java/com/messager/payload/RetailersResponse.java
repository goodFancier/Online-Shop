package com.messager.payload;

import com.messager.model.retailer.Retailer;

public class RetailersResponse {

    private Long id;

    private String name;

    private String imageUrl;

    public RetailersResponse()
    {
    }

    public RetailersResponse(Retailer retailer)
    {
        this.id = retailer.getId();
        this.name = retailer.getName();
        this.imageUrl = retailer.getImageUrl();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
