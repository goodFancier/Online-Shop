package com.messager.model;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Offer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private byte[] image;

    @Transient
    private String imageUrl;

    @Lob
    @Column
    private String description;

    private Date startDate;

    private Date finishDate;

    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "offer_goods",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "good_id"))
    private List<Good> goodList;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public byte[] getImage()
    {
        return image;
    }

    public void setImage(byte[] image)
    {
        this.image = image;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Date getStartDate()
    {
        return startDate;
    }

    public void setStartDate(Date startDate)
    {
        this.startDate = startDate;
    }

    public Date getFinishDate()
    {
        return finishDate;
    }

    public void setFinishDate(Date finishDate)
    {
        this.finishDate = finishDate;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public List<Good> getGoodList()
    {
        return goodList;
    }

    public void setGoodList(List<Good> goodList)
    {
        this.goodList = goodList;
    }


}
