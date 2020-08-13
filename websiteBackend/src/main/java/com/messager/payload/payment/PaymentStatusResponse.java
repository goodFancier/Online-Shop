package com.messager.payload.payment;

public class PaymentStatusResponse
{
		/**
		 * статус платежа
		 */
		private String state;

		/**
		 * сумма платежа в копейках
		 */
		private String totalAmount;

		/**
		 * время создания платежа (Время должно быть в формате: yyyy-mm-dd hh:mm:ss)
		 */
		private String createdDate;

		/**
		 * уникальный код провайдера услуг
		 */
		private String providerServCode;

		/**
		 * название провайдера услуг
		 */
		private String providerName;

		/**
		 * код ошибки, используется для локализации проблемы.(
		 */
		private String errorCode;

		public String getState()
		{
				return state;
		}

		public void setState(String state)
		{
				this.state = state;
		}

		public String getTotalAmount()
		{
				return totalAmount;
		}

		public void setTotalAmount(String totalAmount)
		{
				this.totalAmount = totalAmount;
		}

		public String getCreatedDate()
		{
				return createdDate;
		}

		public void setCreatedDate(String createdDate)
		{
				this.createdDate = createdDate;
		}

		public String getProviderServCode()
		{
				return providerServCode;
		}

		public void setProviderServCode(String providerServCode)
		{
				this.providerServCode = providerServCode;
		}

		public String getProviderName()
		{
				return providerName;
		}

		public void setProviderName(String providerName)
		{
				this.providerName = providerName;
		}

		public String getErrorCode()
		{
				return errorCode;
		}

		public void setErrorCode(String errorCode)
		{
				this.errorCode = errorCode;
		}
}