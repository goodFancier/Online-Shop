package com.messager.payload.taxiSettings;

import java.util.List;

public class TaxiSettingsResponse
{
		private String name;

		private String host;

		private String port;

		private String secretKey;

		private List<Long> retailerList;

		private Long internalCode;

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
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

		public List<Long> getRetailerList()
		{
				return retailerList;
		}

		public void setRetailerList(List<Long> retailerList)
		{
				this.retailerList = retailerList;
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
