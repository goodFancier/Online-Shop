package com.messager.payload;

import javax.validation.constraints.NotBlank;

public class SmsResponse
{
		@NotBlank
		private String phone;

		private String smsCode;

		public String getPhone()
		{
				return phone;
		}

		public void setPhone(String phone)
		{
				this.phone = phone;
		}

		public String getSmsCode()
		{
				return smsCode;
		}

		public void setSmsCode(String smsCode)
		{
				this.smsCode = smsCode;
		}
}
