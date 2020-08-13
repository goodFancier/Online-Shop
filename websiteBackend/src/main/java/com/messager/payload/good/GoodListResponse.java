package com.messager.payload.good;

import java.util.List;

public class GoodListResponse
{
		List<GoodResponse> goodList;

		public GoodListResponse(List<GoodResponse> goodList)
		{
				this.goodList = goodList;
		}

		public List<GoodResponse> getGoodListResponse()
		{
				return goodList;
		}

		public void setGoodListResponse(List<GoodResponse> goodList)
		{
				this.goodList = goodList;
		}
}
