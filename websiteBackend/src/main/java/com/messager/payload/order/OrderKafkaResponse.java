package com.messager.payload.order;

import com.messager.model.Good;
import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import com.messager.model.enumdto.OrderStatus;
import com.messager.payload.good.GoodOrderDetailsResponse;
import com.messager.payload.user.UserResponse;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrderKafkaResponse
{
		private Long id;

		private String email;

		private String additionalPhone;

		private String address;

		private String name;

		private String comment;

		private UserResponse user;

		private OrderStatus orderStatus;

		private List<GoodOrderDetailsResponse> goodList;

		private Float deliveryPrice;

		private BigDecimal totalSum = new BigDecimal(0);

		public OrderKafkaResponse()
		{
		}

		public OrderKafkaResponse(Orders orders)
		{
				this.id = orders.getId();
				this.email = orders.getEmail();
				this.additionalPhone = orders.getAdditionalPhone();
				this.address = orders.getAddress();
				this.name = orders.getName();
				this.comment = orders.getComment();
				this.user = new UserResponse(orders.getUser());
				this.orderStatus = orders.getStatus();
				this.deliveryPrice = orders.getDeliveryPrice();
				if(orders.getOrderDetailList() != null)
				{
						List<GoodOrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
						for(OrderDetails goodOrderDetailsResponse : orders.getOrderDetailList())
						{
								orderDetailsResponses.add(new GoodOrderDetailsResponse(goodOrderDetailsResponse.getGood(), goodOrderDetailsResponse.getQuantity(),
									goodOrderDetailsResponse.getGood().getImageUrl(), goodOrderDetailsResponse.getGood().getRetailer()));
						}
						this.goodList = orderDetailsResponses;
				}
				for(OrderDetails orderDetails : orders.getOrderDetailList())
				{
						this.totalSum = this.totalSum.add(orderDetails.getGood().getCurrentPrice() != null?
							orderDetails.getGood().getCurrentPrice().multiply(new BigDecimal(orderDetails.getQuantity())): new BigDecimal(0));
				}
		}

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

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

		public UserResponse getUser()
		{
				return user;
		}

		public void setUser(UserResponse user)
		{
				this.user = user;
		}

		public List<GoodOrderDetailsResponse> getGoodList()
		{
				return goodList;
		}

		public void setGoodList(List<GoodOrderDetailsResponse> goodList)
		{
				this.goodList = goodList;
		}

		public OrderStatus getOrderStatus()
		{
				return orderStatus;
		}

		public void setOrderStatus(OrderStatus orderStatus)
		{
				this.orderStatus = orderStatus;
		}

		public Float getDeliveryPrice()
		{
				return deliveryPrice;
		}

		public void setDeliveryPrice(Float deliveryPrice)
		{
				this.deliveryPrice = deliveryPrice;
		}

		public BigDecimal getTotalSum()
		{
				return totalSum;
		}

		public void setTotalSum(BigDecimal totalSum)
		{
				this.totalSum = totalSum;
		}
}
