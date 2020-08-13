package com.messager.utils;

import com.messager.model.retailer.Retailer;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class RetailersUtils
{
		public void initRetailersImages(Page<Retailer> retailersList)
		{
				for(Retailer retailer : retailersList.getContent())
				{
						if(retailer.getLogo() != null)
								retailer.setImageUrl("data:image/jpg;base64," + Base64.encodeBase64String(retailer.getLogo()));
				}
		}
}
