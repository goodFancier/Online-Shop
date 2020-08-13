package com.messager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.messager.model.audit.DateAudit;

import javax.persistence.*;

@Entity
public class OrderDetails extends DateAudit
{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		/**
		 * Заказ
		 */
		@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
		@JoinColumn(name = "order_id", nullable = false)
		private Orders order;

		/**
		 * Заказ
		 */
		@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
		@JoinColumn(name = "good_id", nullable = false)
		private Good good;

		@Transient
		@JsonIgnore
		private String ImageUrl;

		/**
		 * Количество товара
		 */
		private Integer quantity;

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public Orders getOrder()
		{
				return order;
		}

		public void setOrder(Orders order)
		{
				this.order = order;
		}

		public Good getGood()
		{
				return good;
		}

		public void setGood(Good good)
		{
				this.good = good;
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
				return ImageUrl;
		}

		public void setImageUrl(String imageUrl)
		{
				ImageUrl = imageUrl;
		}
}
