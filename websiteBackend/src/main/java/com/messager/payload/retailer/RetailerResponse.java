package com.messager.payload.retailer;

public class RetailerResponse
{
		protected Long id;

		private String name;

		private byte[] logo;

		private String shippingAddress;

		private Boolean isOutdated;

		private String city;

		private Double positionX;

		private Double positionY;

		public RetailerResponse(Long id, String name, byte[] logo, String shippingAddress, Boolean isOutdated, String city, Double positionX, Double positionY)
		{
				this.id = id;
				this.name = name;
				this.logo = logo;
				this.shippingAddress = shippingAddress;
				this.city = city;
				this.positionX = positionX;
				this.positionY = positionY;
		}

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public byte[] getLogo()
		{
				return logo;
		}

		public void setLogo(byte[] logo)
		{
				this.logo = logo;
		}

		public String getShippingAddress()
		{
				return shippingAddress;
		}

		public void setShippingAddress(String shippingAddress)
		{
				this.shippingAddress = shippingAddress;
		}

		public Boolean getOutdated()
		{
				return isOutdated;
		}

		public void setOutdated(Boolean outdated)
		{
				isOutdated = outdated;
		}

		public String getCity()
		{
			return city;
		}

		public void setCity(String city)
		{
			this.city = city;
		}

		public Double getPositionX()
		{
			return positionX;
		}

		public void setPositionX(Double positionX)
		{
			this.positionX = positionX;
		}

		public Double getPositionY()
		{
			return positionY;
		}

		public void setPositionY(Double positionY)
		{
			this.positionY = positionY;
		}
}
