package com.messager.controller;

import com.messager.repository.GoodsRepository;
import com.messager.model.Good;
import com.messager.model.UserBucket;
import com.messager.repository.UserBucketRepository;
import com.messager.utils.GoodUtils;
import com.messager.utils.UserBucketUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserBucketController
{
    private static final Logger logger = LoggerFactory.getLogger(UserBucketController.class);

    @Autowired
    private UserBucketRepository userBucketRepository;

    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private UserBucketUtils userBucketUtils;

    @Autowired
    private GoodUtils goodUtils;

    @GetMapping("/deleteFromUserBucket")
    public List<Good> deleteFromUserBucket(@RequestParam(value = "userId") String userId, @RequestParam(value = "goodId") String goodId)
    {
        UserBucket userBucket = userBucketUtils.getUserBucketByUserId(userId);
        userBucket.getBucketGoods().remove(goodsRepository.findGoodById(Long.valueOf(goodId)));
        userBucketRepository.save(userBucket);
        return goodUtils.initGoodImages(userBucket.getBucketGoods());
    }

    @GetMapping("/getBucketTotalSum")
    public Integer getBucketTotalSum(@RequestParam(value = "userId") String userId)
    {
        UserBucket userBucket = userBucketUtils.getUserBucketByUserId(userId);
        if (userBucket == null || userBucket.getBucketGoods() == null || userBucket.getBucketGoods().isEmpty())
            return 0;
        return userBucket.getBucketGoods().stream().map(Good::getCurrentPrice)
                .map(Integer::valueOf)
                .reduce(0, Integer::sum);
    }


    @GetMapping("/addToBucket")
    public void addToBucket(@RequestParam(value = "userId") String userId, @RequestParam(value = "goodId") String goodId)
    {
        UserBucket userBucket = userBucketUtils.getUserBucketByUserId(userId);
        userBucket.getBucketGoods().add(goodsRepository.findGoodById(Long.valueOf(goodId)));
        userBucketRepository.save(userBucket);
    }

    @GetMapping("/getUserGoods")
    public List<Good> getUserGoods(@RequestParam(value = "userId") String userId)
    {
        UserBucket userBucket = userBucketUtils.getUserBucketByUserId(userId);
        if (userBucket == null)
            return null;
        return goodUtils.initGoodImages(userBucket.getBucketGoods());
    }
}
