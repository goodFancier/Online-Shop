package com.messager.payload.order;

import com.messager.payload.good.GoodOrderDetailsResponse;

import java.util.List;

public class OrderRequest
{
		private String email;

		private String additionalPhone;

		private String address;

		private String name;

		private String comment;

		private Float deliveryPrice;

		private List<GoodOrderDetailsResponse> goods;

		public String getEmail()
		{
				return email;
		}

		public void setEmail(String email)
		{
				this.email = email;
		}

		public String getAdditionalPhone()
		{
				return additionalPhone;
		}

		public void setAdditionalPhone(String additionalPhone)
		{
				this.additionalPhone = additionalPhone;
		}

		public String getAddress()
		{
				return address;
		}

		public void setAddress(String address)
		{
				this.address = address;
		}

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public String getComment()
		{
				return comment;
		}

		public void setComment(String comment)
		{
				this.comment = comment;
		}

		public Float getDeliveryPrice()
		{
				return deliveryPrice;
		}

		public void setDeliveryPrice(Float deliveryPrice)
		{
				this.deliveryPrice = deliveryPrice;
		}

		public List<GoodOrderDetailsResponse> getGoods()
		{
				return goods;
		}

		public void setGoods(List<GoodOrderDetailsResponse> goods)
		{
				this.goods = goods;
		}
}
