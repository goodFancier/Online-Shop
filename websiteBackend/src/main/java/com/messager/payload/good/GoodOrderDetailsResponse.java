package com.messager.payload.good;

import com.messager.model.Good;
import com.messager.model.retailer.Retailer;

public class GoodOrderDetailsResponse extends GoodResponse
{
		private Integer quantity;

		public String imageUrl;

		public String retailerName;

		public String retailerCity;

		public GoodOrderDetailsResponse()
		{
		}

		public GoodOrderDetailsResponse(Good good, Integer quantity, String imageUrl, Retailer retailerDto)
		{
				super(good);
				this.quantity = quantity;
				this.imageUrl = imageUrl;
				this.retailerCity = retailerDto.getCity();
				this.retailerName = retailerDto.getName();
		}

		public Integer getQuantity()
		{
				return quantity;
		}

		public void setQuantity(Integer quantity)
		{
				this.quantity = quantity;
		}

		public String getImageUrl()
		{
				return imageUrl;
		}

		public void setImageUrl(String imageUrl)
		{
				this.imageUrl = imageUrl;
		}

		public String getRetailerName()
		{
				return retailerName;
		}

		public void setRetailerName(String retailerName)
		{
				this.retailerName = retailerName;
		}

		public String getRetailerCity()
		{
				return retailerCity;
		}

		public void setRetailerCity(String retailerCity)
		{
				this.retailerCity = retailerCity;
		}
}
