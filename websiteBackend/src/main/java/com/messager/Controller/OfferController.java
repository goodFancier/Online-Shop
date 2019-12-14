package com.messager.Controller;

import com.messager.Repository.OffersRepository;
import com.messager.model.Offer;
import com.messager.utils.OfferUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
