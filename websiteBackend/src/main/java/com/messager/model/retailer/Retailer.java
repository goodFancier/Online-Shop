package com.messager.model.retailer;

import com.messager.model.tm.TaxiProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "retailers")
public class Retailer
{
		@Id
		@Column(name = "id")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		protected Long id;

		/**
		 * Наименование
		 */
		@Column(name = "name", length = 255, nullable = false)
		private String name;

		/**
		 * Логотип
		 */
		@Lob
		private byte[] logo;

		@Transient
		private String imageUrl;

		private String shippingAddress;

		private Boolean isOutdated = false;

		private Long internalCode;

		@ManyToMany(fetch = FetchType.EAGER)
		@JoinTable(name = "retailer_taxiproperites",
			joinColumns = @JoinColumn(name = "retailer"),
			inverseJoinColumns = @JoinColumn(name = "taxiproperty"))
		private List<TaxiProperties> taxiPropertiesList;

		private String city;

		@Column(name = "position_X", columnDefinition = "decimal(10, 8) DEFAULT NULL")
		private Double positionX;

		@Column(name = "position_Y", columnDefinition = "decimal(10, 8) DEFAULT NULL")
		private Double positionY;

		public String getImageUrl()
		{
				return imageUrl;
		}

		public void setImageUrl(String imageUrl)
		{
				this.imageUrl = imageUrl;
		}

		public void RetailerDto(String name, byte[] logo)
		{
				this.name = name;
				this.logo = logo;
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

		@Override
		public String toString()
		{
				return this.getName();
		}

		public List<TaxiProperties> getTaxiPropertiesList()
		{
				return taxiPropertiesList;
		}

		public void setTaxiPropertiesList(List<TaxiProperties> taxiPropertiesList)
		{
				this.taxiPropertiesList = taxiPropertiesList;
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

		public Long getInternalCode()
		{
				return internalCode;
		}

		public void setInternalCode(Long internalCode)
		{
				this.internalCode = internalCode;
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
