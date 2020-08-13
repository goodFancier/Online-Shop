package com.messager.payload.good;

import com.messager.model.Good;

import java.math.BigDecimal;
import java.time.Instant;

public class GoodResponseForRetailer {

    private Long id;

    private String internalCode;

    private String name;

    private BigDecimal currentPrice;

    private String imageUrl;

    private Boolean isAddToBucket;

    private Long retailer;

    private Boolean isOutdated;

    private Instant createdAt;

    public GoodResponseForRetailer(Good good) {
        this.id = good.getId();
        this.internalCode = good.getInternalCode();
        this.name = good.getName();
        this.currentPrice = good.getCurrentPrice();
        this.imageUrl = good.getImageUrl();
        this.isAddToBucket = good.getAddToBucket();
        this.retailer = good.getRetailer().getId();
        this.isOutdated = good.getOutdated();
        this.createdAt = good.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInternalCode() {
        return internalCode;
    }

    public void setInternalCode(String internalCode) {
        this.internalCode = internalCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getAddToBucket() {
        return isAddToBucket;
    }

    public void setAddToBucket(Boolean addToBucket) {
        isAddToBucket = addToBucket;
    }

    public Long getRetailer() {
        return retailer;
    }

    public void setRetailer(Long retailer) {
        this.retailer = retailer;
    }

    public Boolean getOutdated() {
        return isOutdated;
    }

    public void setOutdated(Boolean outdated) {
        isOutdated = outdated;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
