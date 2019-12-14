package com.messager.utils;

import com.messager.model.Offer;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class OfferUtils
{
    public void initOfferImages(List<Offer> offerList)
    {
        for (Offer offer : offerList)
        {
            if (offer.getImage() != null)
                offer.setImageUrl(new String(Base64.decodeBase64(offer.getImage()), StandardCharsets.UTF_8));
        }
    }
}