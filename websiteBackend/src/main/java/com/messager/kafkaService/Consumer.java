package com.messager.kafkaService;

import com.google.gson.Gson;
import com.messager.payload.good.GoodListResponse;
import com.messager.payload.order.OrderKafkaResponse;
import com.messager.payload.retailer.RetailerListResponse;
import com.messager.payload.taxiSettings.TaxiSettingsResponseList;
import com.messager.service.kafkaConsumer.GoodConsumerService;
import com.messager.service.kafkaConsumer.OrderConsumerService;
import com.messager.service.kafkaConsumer.RetailerConsumerService;
import com.messager.service.kafkaConsumer.TaxiSettingConsumerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class Consumer
{
		private final Logger LOG = LoggerFactory.getLogger(Consumer.class);

		@Autowired
		private GoodConsumerService goodConsumerService;

		@Autowired
		private TaxiSettingConsumerService taxiSettingConsumerService;

		@Autowired
		private RetailerConsumerService retailerConsumerService;

		@Autowired
		private OrderConsumerService orderConsumerService;

		@KafkaListener(topics = "${message.topic.requestGoods}")
		public void listenGoodsExport(@Payload String goodJson)
		{
				Gson gson = new Gson();
				GoodListResponse goodListResponse = gson.fromJson(goodJson, GoodListResponse.class);
				goodConsumerService.goodProcess(goodListResponse);
		}

		@KafkaListener(topics = "${message.topic.requestTaxiSettings}")
		public void listenTaxiSettings(@Payload String taxiSettingsJson)
		{
				Gson gson = new Gson();
				TaxiSettingsResponseList taxiSettingsResponse = gson.fromJson(taxiSettingsJson, TaxiSettingsResponseList.class);
				taxiSettingConsumerService.processTaxiSettings(taxiSettingsResponse);
		}

		@KafkaListener(topics = "${message.topic.requestRetailers}")
		public void listenRetailers(@Payload String retailerJson)
		{
				RetailerListResponse retailerListResponse = new Gson().fromJson(retailerJson, RetailerListResponse.class);
				retailerConsumerService.processRetailer(retailerListResponse);
		}

		@KafkaListener(topics = "${message.topic.requestOrders}")
		public void listenOrders(@Payload String orderJson)
		{
				Gson gson = new Gson();
				OrderKafkaResponse orderResponse = gson.fromJson(orderJson, OrderKafkaResponse.class);
				orderConsumerService.processOrder(orderResponse);
		}
}
