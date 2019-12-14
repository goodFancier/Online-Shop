package com.messager.utils;

import com.messager.model.Good;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class GoodUtils
{
    public void initGoodImages(List<Good> goodList)
    {
        for (Good good : goodList)
        {
            if (good.getImage() != null)
                good.setImageUrl(new String(Base64.decodeBase64(good.getImage()), StandardCharsets.UTF_8));
        }
    }
}
