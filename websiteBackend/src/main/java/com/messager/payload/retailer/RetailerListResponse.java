package com.messager.payload.retailer;

import java.util.List;

public class RetailerListResponse
{
		private List<RetailerResponse> brandForProducerList;

		public List<RetailerResponse> getBrandForProducerList()
		{
				return brandForProducerList;
		}

		public void setBrandForProducerList(List<RetailerResponse> brandForProducerList)
		{
				this.brandForProducerList = brandForProducerList;
		}
}
