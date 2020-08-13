package com.messager.payload.order;

import java.util.Map;

public class DeliveryPriceResponse
{
		private String deliveryPrice;

		private String foundRightAddress;

		private Map<String, String> coordMap;

		public DeliveryPriceResponse(String deliveryPrice, String foundRightAddress, Map<String, String> coordMap)
		{
				this.deliveryPrice = deliveryPrice;
				this.foundRightAddress = foundRightAddress;
				this.coordMap = coordMap;
		}

		public String getDeliveryPrice()
		{
				return deliveryPrice;
		}

		public void setDeliveryPrice(String deliveryPrice)
		{
				this.deliveryPrice = deliveryPrice;
		}

		public String getFoundRightAddress()
		{
				return foundRightAddress;
		}

		public void setFoundRightAddress(String foundRightAddress)
		{
				this.foundRightAddress = foundRightAddress;
		}

		public Map<String, String> getCoordMap()
		{
				return coordMap;
		}

		public void setCoordMap(Map<String, String> coordMap)
		{
				this.coordMap = coordMap;
		}
}
