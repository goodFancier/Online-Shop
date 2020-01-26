package com.messager.model;

import com.messager.model.audit.DateAudit;
import com.messager.model.enumdto.GoodChangeable;
import org.hibernate.annotations.ColumnDefault;

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

    private String producer;

    @Lob
    @Column
    private String description;

    private String guaranteeTime;

    private String yearOfProduced;

    @Column(nullable = false, columnDefinition = "enum('CHANGEABLE','UNCHANGEABLE') default 'CHANGEABLE'")
    @Enumerated(EnumType.STRING)
    private GoodChangeable isChangeable;

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

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getProducer()
    {
        return producer;
    }

    public void setProducer(String producer)
    {
        this.producer = producer;
    }

    public String getGuaranteeTime()
    {
        return guaranteeTime;
    }

    public void setGuaranteeTime(String guaranteeTime)
    {
        this.guaranteeTime = guaranteeTime;
    }

    public String getYearOfProduced()
    {
        return yearOfProduced;
    }

    public void setYearOfProduced(String yearOfProduced)
    {
        this.yearOfProduced = yearOfProduced;
    }

    public String getIsChangeable()
    {
        return isChangeable.getTitle();
    }

    public void setIsChangeable(GoodChangeable isChangeable)
    {
        this.isChangeable = isChangeable;
    }
}
