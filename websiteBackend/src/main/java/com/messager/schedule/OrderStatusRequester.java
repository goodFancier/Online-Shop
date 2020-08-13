package com.messager.schedule;

import com.messager.kafkaService.Producer;
import com.messager.model.Orders;
import com.messager.model.enumdto.OrderStatus;
import com.messager.payload.payment.PaymentStatusResponse;
import com.messager.repository.OrderRepository;
import com.messager.service.order.payment.PaymentService;
import com.messager.service.taxiMaster.TaxiOrderProcess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class OrderStatusRequester
{
		@Autowired
		private PaymentService paymentService;

		@Autowired
		private OrderRepository orderRepository;

		@Autowired
		private Producer producer;

		@Autowired
		private TaxiOrderProcess taxiOrderProcess;

		@Scheduled(fixedDelayString = "${ckassa.requeststatus.pauseTimeSec}000")
		public void requestOrdersStatus() throws Exception
		{
				List<Orders> ordersList = orderRepository.findAllByStatusAndPaymentNumberIsNotNull(OrderStatus.awaitingPayment);
				for(Orders order : ordersList)
				{
						PaymentStatusResponse paymentStatusResponse = paymentService.getPaymentStatus(order.getPaymentNumber());
						if(paymentStatusResponse.getState().equals("payed") || paymentStatusResponse.getState().equals("processed") || paymentStatusResponse.getState().equals("holded"))
						{
								order.setStatus(OrderStatus.paid);
								orderRepository.save(order);
								producer.sendOrderRequest(order);
								taxiOrderProcess.createTaxiOrder(order, order.getOrderDetailList().get(0).getGood().getRetailer());
						}
				}
		}

		@Scheduled(fixedDelayString = "${tm.requestTaxiOrderStatus.pauseTimeSec}000")
		public void requestTaxiOrderStatus() throws Exception
		{
				List<Orders> ordersList = orderRepository.findAllByStatusInAndTaxiOrderIdIsNotNull(Arrays.asList(OrderStatus.paid, OrderStatus.courierSearch, OrderStatus.courierFound, OrderStatus.deliveryInProgress));
				for(Orders order : ordersList)
				{
						OrderStatus prevOrderStatus = order.getStatus();
						Map<String, String> mapResult = taxiOrderProcess.getTaxiOrderStatus(order.getTaxiOrderId(), order.getOrderDetailList().get(0).getGood().getRetailer());
						if (mapResult != null) {
							switch (mapResult.get("get_order_state")) {
								case "new_order":
									orderSave(order, OrderStatus.courierSearch, mapResult);
									break;
								case "driver_assigned":
									orderSave(order, OrderStatus.courierFound, mapResult);
									break;
								case "car_at_place":
									orderSave(order, OrderStatus.courierFound, mapResult);
									break;
								case "client_inside":
									orderSave(order, OrderStatus.deliveryInProgress, mapResult);
									break;
								case "finished":
									orderSave(order, OrderStatus.awaitingConfirmation, mapResult);
									break;
							}
						}

						if(!prevOrderStatus.equals(order.getStatus()))
						{
								producer.sendOrderRequest(order);
						}
				}
		}

		private void orderSave(Orders order, OrderStatus status, Map<String, String> mapResult)
		{
			order.setCarColor(mapResult.get("car_color"));
			order.setCarMark(mapResult.get("car_mark"));
			order.setCarModel(mapResult.get("car_model"));
			order.setCarNumber(mapResult.get("car_number"));
			order.setStatus(status);
			order.setNameDriver(mapResult.get("name"));
			order.setPhoneDriver(mapResult.get("phones"));
			orderRepository.save(order);
		}
}
