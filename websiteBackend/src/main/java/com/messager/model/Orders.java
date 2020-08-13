package com.messager.model;

import com.messager.model.audit.DateAudit;
import com.messager.model.enumdto.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Orders extends DateAudit
{
		public Orders(String additionalPhone, @NotBlank String address, String name, String comment, List<Good> goodList, Float deliveryPrice)
		{
				this.additionalPhone = additionalPhone;
				this.address = address;
				this.name = name;
				this.comment = comment;
				this.deliveryPrice = deliveryPrice;
		}

		public Orders()
		{
		}

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		/**
		 * Покупатель
		 */
		@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
		@JoinColumn(name = "User", nullable = false)
		private User user;

		/**
		 * Список заказов
		 */
		@OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
		private List<OrderDetails> orderDetailList;

		private String email;

		private String additionalPhone;

		private String address;

		private String name;

		@Lob
		private String comment;

		private Float deliveryPrice;

		private String paymentNumber;

		private String carMark;

		private String carModel;

		private String carColor;

		private String carNumber;

		private String nameDriver;

		private String phoneDriver;

		@Column(name = "status", columnDefinition = "ENUM('awaitingPayment', 'inProgress', 'paid', 'transferredToDeliveryService', 'completed', 'NEW', 'canceled', 'courierSearch', 'courierFound' ,'deliveryInProgress','awaitingConfirmation', 'delivered') NOT NULL DEFAULT 'inProgress'")
		@Enumerated(EnumType.STRING)
		private OrderStatus status;

		private Long taxiOrderId;

		public Float getDeliveryPrice()
		{
				return deliveryPrice;
		}

		public void setDeliveryPrice(Float deliveryPrice)
		{
				this.deliveryPrice = deliveryPrice;
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

		public User getUser()
		{
				return user;
		}

		public void setUser(User user)
		{
				this.user = user;
		}

		public OrderStatus getStatus()
		{
				return status;
		}

		public void setStatus(OrderStatus orderStatus)
		{
				this.status = orderStatus;
		}

		public List<OrderDetails> getOrderDetailList()
		{
				return orderDetailList;
		}

		public void setOrderDetailList(List<OrderDetails> ordersList)
		{
				this.orderDetailList = ordersList;
		}

		public String getPaymentNumber()
		{
				return paymentNumber;
		}

		public void setPaymentNumber(String paymentNumber)
		{
				this.paymentNumber = paymentNumber;
		}

		public Long getTaxiOrderId()
		{
				return taxiOrderId;
		}

		public void setTaxiOrderId(Long taxiOrderId)
		{
				this.taxiOrderId = taxiOrderId;
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
