package com.messager.payload.payment;

import java.util.List;

public class PaymentResponse
{
		/**
		 * подпись
		 */
		private String sign;

		/**
		 * код провайдера
		 */
		private String serviceCode;

		/**
		 * токен пользователя
		 */
		private String userToken;

		/**
		 * сумма платежа в копейках (сумма которая идет на счет пользователю)
		 */
		private Integer amount;

		/**
		 * комиссия платежа в копейках (если нет комиссии - передается 0)
		 */
		private String comission;

		/**
		 * идентификатор карты (для рекуррентного платежа), см. пункт Получение списка карт
		 */
		private String cardToken;

		/**
		 * тип клиента
		 */
		private String clientType;

		/**
		 * Токен при оплате через Google Pay. Более подробно в разделе Google Pay
		 */
		private String gPayToken;

		/**
		 * Номер телефона пользователя(для СМС платежа), с которого будет произведена оплата
		 */
		private String userPhone;

		/**
		 * номер телефона с кодом, но без + (например, 79999999999)
		 */
		private String login;

		/**
		 * e-mail для отправки фискального чека
		 */
		private String email;

		/**
		 * Имя пользователя
		 */
		private String name;

		/**
		 * Фамилия пользователя
		 */
		private String surName;

		/**
		 * Отчество пользователя
		 */
		private String middleName;

		/**
		 * Описание Параметра
		 */
		private String fiscalType;

		/**
		 * способ оплаты
		 */
		private String payType;

		/**
		 * Время истечения срока жизни заказа в секундах. Подробнее
		 */
		private String orderBestBefore;

		/**
		 * массив реквизитов
		 */
		private List<CKassaRequestProperties> properties;

		private String regPayNum;

		/**
		 * идентификатор организации
		 */
		private String shopToken;

		/**
		 * секретный ключ магазина
		 */
		private String shopSecKey;

		public String getServiceCode()
		{
				return serviceCode;
		}

		public void setServiceCode(String serviceCode)
		{
				this.serviceCode = serviceCode;
		}

		public Integer getAmount()
		{
				return amount;
		}

		public void setAmount(Integer amount)
		{
				this.amount = amount;
		}

		public String getComission()
		{
				return comission;
		}

		public void setComission(String comission)
		{
				this.comission = comission;
		}

		public String getCardToken()
		{
				return cardToken;
		}

		public void setCardToken(String cardToken)
		{
				this.cardToken = cardToken;
		}

		public String getgPayToken()
		{
				return gPayToken;
		}

		public void setgPayToken(String gPayToken)
		{
				this.gPayToken = gPayToken;
		}

		public String getPayType()
		{
				return payType;
		}

		public void setPayType(String payType)
		{
				this.payType = payType;
		}

		public String getClientType()
		{
				return clientType;
		}

		public void setClientType(String clientType)
		{
				this.clientType = clientType;
		}

		public String getUserPhone()
		{
				return userPhone;
		}

		public void setUserPhone(String userPhone)
		{
				this.userPhone = userPhone;
		}

		public String getEmail()
		{
				return email;
		}

		public void setEmail(String email)
		{
				this.email = email;
		}

		public String getFiscalType()
		{
				return fiscalType;
		}

		public void setFiscalType(String fiscalType)
		{
				this.fiscalType = fiscalType;
		}

		public String getOrderBestBefore()
		{
				return orderBestBefore;
		}

		public void setOrderBestBefore(String orderBestBefore)
		{
				this.orderBestBefore = orderBestBefore;
		}

		public List<CKassaRequestProperties> getProperties()
		{
				return properties;
		}

		public void setProperties(List<CKassaRequestProperties> properties)
		{
				this.properties = properties;
		}

		public String getShopToken()
		{
				return shopToken;
		}

		public void setShopToken(String shopToken)
		{
				this.shopToken = shopToken;
		}

		public String getSign()
		{
				return sign;
		}

		public void setSign(String sign)
		{
				this.sign = sign;
		}

		public String getShopSecKey()
		{
				return shopSecKey;
		}

		public void setShopSecKey(String shopSecKey)
		{
				this.shopSecKey = shopSecKey;
		}

		public String getLogin()
		{
				return login;
		}

		public void setLogin(String login)
		{
				this.login = login;
		}

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public String getSurName()
		{
				return surName;
		}

		public void setSurName(String surName)
		{
				this.surName = surName;
		}

		public String getMiddleName()
		{
				return middleName;
		}

		public void setMiddleName(String middleName)
		{
				this.middleName = middleName;
		}

		public String getUserToken()
		{
				return userToken;
		}

		public void setUserToken(String userToken)
		{
				this.userToken = userToken;
		}

		public String getRegPayNum()
		{
				return regPayNum;
		}

		public void setRegPayNum(String regPayNum)
		{
				this.regPayNum = regPayNum;
		}
}
