package com.messager.model.tm;

import javax.persistence.*;

@Entity
public class TaxiProperties
{
		public TaxiProperties()
		{
		}

		@Id
		@Column(name = "id")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		protected Long id;

		private String host;

		private String port;

		private String secretKey;

		private Long internalCode;

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public String getHost()
		{
				return host;
		}

		public void setHost(String host)
		{
				this.host = host;
		}

		public String getPort()
		{
				return port;
		}

		public void setPort(String port)
		{
				this.port = port;
		}

		public String getSecretKey()
		{
				return secretKey;
		}

		public void setSecretKey(String secretKey)
		{
				this.secretKey = secretKey;
		}

		public Long getInternalCode()
		{
				return internalCode;
		}

		public void setInternalCode(Long internalCode)
		{
				this.internalCode = internalCode;
		}
}
