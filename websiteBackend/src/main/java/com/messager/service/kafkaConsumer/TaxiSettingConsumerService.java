package com.messager.service.kafkaConsumer;

import com.messager.model.retailer.Retailer;
import com.messager.model.tm.TaxiProperties;
import com.messager.payload.taxiSettings.TaxiSettingsResponse;
import com.messager.payload.taxiSettings.TaxiSettingsResponseList;
import com.messager.repository.RetailersRepository;
import com.messager.repository.TaxiPropertiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TaxiSettingConsumerService
{
		@Autowired
		RetailersRepository retailersRepository;

		@Autowired
		TaxiPropertiesRepository taxiPropertiesRepository;

		public void processTaxiSettings(TaxiSettingsResponseList taxiSettingsResponseList)
		{
				for(TaxiSettingsResponse taxiSettingsResponse : taxiSettingsResponseList.getDeliveryServiceList())
				{
						for(Long retailerId : taxiSettingsResponse.getRetailerList())
						{
								Retailer retailer = retailersRepository.findByInternalCode(retailerId).orElse(null);
								TaxiProperties taxiProperties = taxiPropertiesRepository.findByInternalCode(taxiSettingsResponse.getInternalCode()).orElse(null);
								if(retailer != null)
								{
										if(taxiProperties == null)
										{
												taxiProperties = new TaxiProperties();
										}
										taxiProperties.setHost(taxiSettingsResponse.getHost());
										taxiProperties.setPort(taxiSettingsResponse.getPort());
										taxiProperties.setSecretKey(taxiSettingsResponse.getSecretKey());
										taxiProperties.setInternalCode(taxiSettingsResponse.getInternalCode());
										taxiPropertiesRepository.save(taxiProperties);
										retailer.setTaxiPropertiesList(new ArrayList<>());
										retailer.getTaxiPropertiesList().add(taxiProperties);
										retailersRepository.save(retailer);
								}
						}
				}
		}
}
