package com.messager.payload.good;

import com.messager.model.Good;

import java.math.BigDecimal;

public class GoodResponse
{
		private Long goodId;

		private String name;

		private BigDecimal price;

		private Long retailer;

		private Long retailerId;

		private String city;

		private byte[] image;

		private String ingredients;

		private Boolean isOutdated;

		private String internalCode;

		private Boolean isAddToBucket;

		public GoodResponse(Good good)
		{
				this.goodId = good.getId();
				this.name = good.getName();
				this.price = good.getCurrentPrice();
				this.retailer = good.getRetailer().getInternalCode();
				this.internalCode = good.getInternalCode();
				this.isAddToBucket = good.getAddToBucket();
				this.retailerId = good.getRetailer().getId();
				this.city = good.getRetailer().getCity();
		}

		public GoodResponse()
		{
		}

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public BigDecimal getPrice()
		{
				return price;
		}

		public void setPrice(BigDecimal price)
		{
				this.price = price;
		}

		public Long getRetailer()
		{
				return retailer;
		}

		public void setRetailer(Long retailer)
		{
				this.retailer = retailer;
		}

		public byte[] getImage()
		{
				return image;
		}

		public void setImage(byte[] image)
		{
				this.image = image;
		}

		public String getIngredients()
		{
				return ingredients;
		}

		public void setIngredients(String ingredients)
		{
				this.ingredients = ingredients;
		}

		public Boolean getOutdated()
		{
				return isOutdated;
		}

		public void setOutdated(Boolean outdated)
		{
				isOutdated = outdated;
		}

		public String getInternalCode()
		{
				return internalCode;
		}

		public void setInternalCode(String internalCode)
		{
				this.internalCode = internalCode;
		}

		public Long getGoodId()
		{
				return goodId;
		}

		public void setGoodId(Long goodId)
		{
				this.goodId = goodId;
		}

		public Boolean getAddToBucket()
		{
			return isAddToBucket;
		}

		public void setAddToBucket(Boolean addToBucket)
		{
			isAddToBucket = addToBucket;
		}

		public Long getRetailerId()
		{
			return retailerId;
		}

		public void setRetailerId(Long retailerId)
		{
			this.retailerId = retailerId;
		}

		public String getCity()
		{
			return city;
		}

		public void setCity(String city)
		{
			this.city = city;
		}
}
