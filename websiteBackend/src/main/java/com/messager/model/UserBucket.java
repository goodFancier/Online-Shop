package com.messager.model;

import com.messager.model.audit.DateAudit;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "userbucket")
public class UserBucket extends DateAudit
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "userBucket_goods",
            joinColumns = @JoinColumn(name = "user_bucket"),
            inverseJoinColumns = @JoinColumn(name = "good_id"))
    private List<Good> bucketGoods;

    public List<Good> getBucketGoods()
    {
        return bucketGoods;
    }

    public void setBucketGoods(List<Good> bucketGoods)
    {
        this.bucketGoods = bucketGoods;
    }

}
