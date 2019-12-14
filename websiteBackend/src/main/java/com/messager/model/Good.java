package com.messager.model;

import com.messager.model.audit.DateAudit;

import javax.persistence.*;

@Entity
public class Good extends DateAudit
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String oldPrice;

    private String currentPrice;

    private byte[] image;

    @Transient
    private String imageUrl;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getOldPrice()
    {
        return oldPrice;
    }

    public void setOldPrice(String oldPrice)
    {
        this.oldPrice = oldPrice;
    }

    public String getCurrentPrice()
    {
        return currentPrice;
    }

    public void setCurrentPrice(String currentPrice)
    {
        this.currentPrice = currentPrice;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public byte[] getImage()
    {
        return image;
    }

    public void setImage(byte[] image)
    {
        this.image = image;
    }
}
