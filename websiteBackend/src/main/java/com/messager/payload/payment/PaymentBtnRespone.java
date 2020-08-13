package com.messager.payload.payment;

public class PaymentBtnRespone
{
		private String sign;

		private String shopToken;

		private String regPayNum;

		private String payUrl;

		private String code;

		private String userMessage;

		public String getSign()
		{
				return sign;
		}

		public void setSign(String sign)
		{
				this.sign = sign;
		}

		public String getShopToken()
		{
				return shopToken;
		}

		public void setShopToken(String shopToken)
		{
				this.shopToken = shopToken;
		}

		public String getRegPayNum()
		{
				return regPayNum;
		}

		public void setRegPayNum(String regPayNum)
		{
				this.regPayNum = regPayNum;
		}

		public String getPayUrl()
		{
				return payUrl;
		}

		public void setPayUrl(String payUrl)
		{
				this.payUrl = payUrl;
		}

		public String getCode()
		{
				return code;
		}

		public void setCode(String code)
		{
				this.code = code;
		}

		public String getUserMessage()
		{
				return userMessage;
		}

		public void setUserMessage(String userMessage)
		{
				this.userMessage = userMessage;
		}
}
