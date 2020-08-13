package com.messager.payload.taxiSettings;

import java.util.List;

public class TaxiSettingsResponseList
{
		private List<TaxiSettingsResponse> deliveryServiceList;

		public List<TaxiSettingsResponse> getDeliveryServiceList()
		{
				return deliveryServiceList;
		}

		public void setTaxiSettingsResponseList(List<TaxiSettingsResponse> deliveryServiceList)
		{
				this.deliveryServiceList = deliveryServiceList;
		}
}
