package com.messager.controller;

import com.messager.repository.OffersRepository;
import com.messager.model.Offer;
import com.messager.utils.OfferUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OfferController
{
    @Autowired
    private OffersRepository offersRepository;

    @Autowired
    private OfferUtils offerUtils;

    @GetMapping("/getPublicOffers")
    public List<Offer> getPublicOffers()
    {
        List<Offer> offerList = offersRepository.findAll();
        offerUtils.initOfferImages(offerList);
        return offerList;
    }

    @GetMapping("/getOfferById")
    public Offer getOfferById(@RequestParam(value = "offerId") String offerId)
    {
        Offer offer = offersRepository.findOfferById(Long.valueOf(offerId));
        offerUtils.initOfferImages(Arrays.asList(offer));
        offer.setGoodList(offer.getGoodList());
        return offer;
    }
}
