package com.messager.model;

import com.messager.model.audit.DateAudit;
import com.messager.model.retailer.Retailer;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Good extends DateAudit
{
		public Good()
		{
		}

		public Good(String name, BigDecimal currentPrice, byte[] image, String description, Retailer retailer, String internalCode)
		{
				this.id = id;
				this.name = name;
				this.currentPrice = currentPrice;
				this.image = image;
				this.description = description;
				this.retailer = retailer;
				this.internalCode = internalCode;
		}

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		private String internalCode;

		private String name;

		private BigDecimal currentPrice;

		@Transient
		private String imageUrl;

		@Transient
		private Boolean isAddToBucket;

		@Lob
		private byte[] image;

		@Lob
		@Column
		private String description;

		@ManyToOne(optional = false, cascade = CascadeType.MERGE)
		@JoinColumn(name = "retailers_id")
		private Retailer retailer;

		private Boolean isOutdated = false;

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public BigDecimal getCurrentPrice()
		{
				return currentPrice;
		}

		public void setCurrentPrice(BigDecimal currentPrice)
		{
				this.currentPrice = currentPrice;
		}

		public byte[] getImage()
		{
				return image;
		}

		public void setImage(byte[] image)
		{
				this.image = image;
		}

		public String getDescription()
		{
				return description;
		}

		public void setDescription(String description)
		{
				this.description = description;
		}

		public Retailer getRetailer()
		{
				return retailer;
		}

		public void setRetailer(Retailer retailer)
		{
				this.retailer = retailer;
		}

		public String getInternalCode()
		{
				return internalCode;
		}

		public void setInternalCode(String internalCode)
		{
				this.internalCode = internalCode;
		}

		public Boolean getOutdated()
		{
				return isOutdated;
		}

		public void setOutdated(Boolean outdated)
		{
				isOutdated = outdated;
		}

		public String getImageUrl()
		{
				return imageUrl;
		}

		public void setImageUrl(String imageUrl)
		{
				this.imageUrl = imageUrl;
		}

		public Boolean getAddToBucket()
		{
			return isAddToBucket;
		}

		public void setAddToBucket(Boolean addToBucket)
		{
			isAddToBucket = addToBucket;
		}
}
