package com.messager.payload.order;

import com.messager.model.Good;
import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import com.messager.payload.good.GoodOrderDetailsResponse;
import com.messager.utils.date.DateFormats;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderResponse
{
		private Long id;

		private List<GoodOrderDetailsResponse> goodList;

		private Long retailer;

		private String retailerName;

		private String address;

		private Float deliveryPrice;

		private String status;

		private String createdAt;

		private Date updatedAt;

		private BigDecimal totalSum = new BigDecimal(0);

		private String paymentNumber;

		private String carMark;

		private String carModel;

		private String carColor;

		private String carNumber;

		private String nameDriver;

		private String phoneDriver;

		public OrderResponse()
		{
		}

		public OrderResponse(Orders orders)
		{
				this.id = orders.getId();
				this.address = orders.getAddress();
				this.deliveryPrice = orders.getDeliveryPrice() != null? orders.getDeliveryPrice(): 0F;
				this.status = orders.getStatus().getTitle();
				this.createdAt = new DateFormats().getPaymentDateFormat().format(Date.from(orders.getCreatedAt()));
				if(orders.getOrderDetailList() != null)
				{
						List<GoodOrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
						for(OrderDetails goodOrderDetailsResponse : orders.getOrderDetailList())
						{
								orderDetailsResponses.add(new GoodOrderDetailsResponse(goodOrderDetailsResponse.getGood(), goodOrderDetailsResponse.getQuantity(),
									goodOrderDetailsResponse.getGood().getImageUrl(), goodOrderDetailsResponse.getGood().getRetailer()));
						}
						this.goodList = orderDetailsResponses;
						orders.getOrderDetailList().stream().map(OrderDetails::getGood).map(Good::getRetailer).findFirst().ifPresent(o -> this.retailer = o.getId());
						orders.getOrderDetailList().stream().map(OrderDetails::getGood).map(Good::getRetailer).findFirst().ifPresent(o -> this.retailerName = o.getName());
						for(OrderDetails orderDetails : orders.getOrderDetailList())
						{
								this.totalSum = this.totalSum.add(orderDetails.getGood().getCurrentPrice() != null?
									orderDetails.getGood().getCurrentPrice().multiply(new BigDecimal(orderDetails.getQuantity())): new BigDecimal(0));
						}
				}
				this.updatedAt = Date.from(orders.getUpdatedAt());
				this.paymentNumber = orders.getPaymentNumber();
				this.carColor = orders.getCarColor();
				this.carMark = orders.getCarMark();
				this.carModel = orders.getCarModel();
				this.carNumber = orders.getCarNumber();
				this.nameDriver = orders.getNameDriver();
				this.phoneDriver = orders.getPhoneDriver();
		}

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public Long getRetailer()
		{
				return retailer;
		}

		public void setRetailer(Long retailer)
		{
				this.retailer = retailer;
		}

		public String getRetailerName()
		{
				return retailerName;
		}

		public void setRetailerName(String retailerName)
		{
				this.retailerName = retailerName;
		}

		public String getAddress()
		{
				return address;
		}

		public void setAddress(String address)
		{
				this.address = address;
		}

		public Float getDeliveryPrice()
		{
				return deliveryPrice;
		}

		public void setDeliveryPrice(Float deliveryPrice)
		{
				this.deliveryPrice = deliveryPrice;
		}

		public String getStatus()
		{
				return status;
		}

		public void setStatus(String status)
		{
				this.status = status;
		}

		public String getCreatedAt()
		{
				return createdAt;
		}

		public void setCreatedAt(String createdAt)
		{
				this.createdAt = createdAt;
		}

		public void setGoodList(List<GoodOrderDetailsResponse> goodList)
		{
				this.goodList = goodList;
		}

		public BigDecimal getTotalSum()
		{
				return totalSum;
		}

		public void setTotalSum(BigDecimal totalSum)
		{
				this.totalSum = totalSum;
		}

		public List<GoodOrderDetailsResponse> getGoodList()
		{
				return goodList;
		}

		public Date getUpdatedAt()
		{
				return updatedAt;
		}

		public void setUpdatedAt(Date updatedAt)
		{
				this.updatedAt = updatedAt;
		}

		public String getPaymentNumber()
		{
				return paymentNumber;
		}

		public void setPaymentNumber(String paymentNumber)
		{
				this.paymentNumber = paymentNumber;
		}

		public String getCarMark()
		{
			return carMark;
		}

		public void setCarMark(String carMark)
		{
			this.carMark = carMark;
		}

		public String getCarModel()
		{
			return carModel;
		}

		public void setCarModel(String carModel)
		{
			this.carModel = carModel;
		}

		public String getCarColor()
		{
			return carColor;
		}

		public void setCarColor(String carColor)
		{
			this.carColor = carColor;
		}

		public String getCarNumber()
		{
			return carNumber;
		}

		public void setCarNumber(String carNumber)
		{
			this.carNumber = carNumber;
		}

		public String getNameDriver()
		{
			return nameDriver;
		}

		public void setNameDriver(String nameDriver)
		{
			this.nameDriver = nameDriver;
		}

		public String getPhoneDriver()
		{
			return phoneDriver;
		}

		public void setPhoneDriver(String phoneDriver)
		{
			this.phoneDriver = phoneDriver;
		}
}
