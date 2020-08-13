package com.messager.service.kafkaConsumer;

import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import com.messager.payload.good.GoodOrderDetailsResponse;
import com.messager.payload.order.OrderKafkaResponse;
import com.messager.repository.GoodsRepository;
import com.messager.repository.OrderDetailsRepository;
import com.messager.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumerService
{
		@Autowired
		private OrderRepository orderRepository;

		@Autowired
		private OrderDetailsRepository orderDetailsRepository;

		@Autowired
		private GoodsRepository goodsRepository;

		/**
		 * Обработка заказа
		 *
		 * @param orderKafkaResponse
		 */
		public void processOrder(OrderKafkaResponse orderKafkaResponse)
		{
				Orders order = orderRepository.findById(orderKafkaResponse.getId()).orElse(null);
				if(order == null)
						return;
				order.setStatus(orderKafkaResponse.getOrderStatus());
				order.setAdditionalPhone(orderKafkaResponse.getAdditionalPhone());
				order.setComment(orderKafkaResponse.getComment());
				order.setAddress(orderKafkaResponse.getAddress());
				order.getOrderDetailList().clear();
				orderRepository.save(order);
				orderDetailsRepository.deleteAll(orderDetailsRepository.findAllByOrder(order));
				for(GoodOrderDetailsResponse goodOrderDetailsResponse : orderKafkaResponse.getGoodList())
				{
						OrderDetails orderDetails = new OrderDetails();
						orderDetails.setQuantity(goodOrderDetailsResponse.getQuantity());
						orderDetails.setGood(goodsRepository.findByInternalCodeAndIsOutdated(goodOrderDetailsResponse.getInternalCode(), false).get(0));
						orderDetails.setOrder(order);
						orderDetailsRepository.save(orderDetails);
				}
		}
}
