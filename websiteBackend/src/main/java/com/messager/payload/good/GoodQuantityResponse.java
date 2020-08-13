package com.messager.payload.good;

public class GoodQuantityResponse
{
		private Long goodId;

		private String eventType;

		public Long getGoodId()
		{
				return goodId;
		}

		public void setGoodId(Long goodId)
		{
				this.goodId = goodId;
		}

		public String getEventType()
		{
				return eventType;
		}

		public void setEventType(String eventType)
		{
				this.eventType = eventType;
		}
}
