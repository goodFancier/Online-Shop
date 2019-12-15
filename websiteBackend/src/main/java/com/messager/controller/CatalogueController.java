package com.messager.controller;

import com.messager.model.Good;
import com.messager.repository.GoodsRepository;
import com.messager.utils.GoodUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class CatalogueController
{
    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private GoodUtils goodUtils;

    @GetMapping("/getCatalogueOfGoods")
    public List<Good> getCatalogueOfGoods()
    {
        List<Good> goodList = goodsRepository.findAll();
        goodUtils.initGoodImages(goodList);
        return goodList;
    }

    @GetMapping("/getRandomGoods")
    public List<Good> getRandomGoods()
    {
        List<Good> goodList = goodsRepository.findAll();
        Random randomGenerator = new Random();
        int randomIndex1 = randomGenerator.nextInt(goodList.size());
        int randomIndex2 = randomGenerator.nextInt(goodList.size());
        while (randomIndex2 == randomIndex1)
            randomIndex2 = randomGenerator.nextInt(goodList.size());
        List<Good> randomList = new ArrayList<>();
        randomList.add(goodList.get(randomIndex1));
        randomList.add(goodList.get(randomIndex2));
        goodUtils.initGoodImages(randomList);
        return randomList;
    }


}
