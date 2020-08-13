package com.messager.service.order;

import com.messager.exception.BadRequestException;
import com.messager.kafkaService.Producer;
import com.messager.model.Orders;
import com.messager.model.User;
import com.messager.model.enumdto.OrderStatus;
import com.messager.payload.ApiResponse;
import com.messager.payload.PagedResponse;
import com.messager.payload.order.OrderResponse;
import com.messager.repository.OrderRepository;
import com.messager.repository.UserRepository;
import com.messager.security.UserPrincipal;
import com.messager.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService
{
		@Autowired
		private OrderRepository orderRepository;

		@Autowired
		private UserRepository userRepository;

		@Autowired
		Producer producer;

		public PagedResponse<OrderResponse> getAllUserOrders(int page, int size, String sortOrder, Boolean isActive, UserPrincipal userPrincipal, String... sortBy)
		{
				validatePageNumberAndSize(page, size);
				Pageable pageable;
				Page<Orders> ordersList;
				if(sortOrder.equals("ascend"))
						pageable = PageRequest.of(page, size, Sort.by(
							Sort.Order.asc(sortBy[0]),
							Sort.Order.desc(sortBy[1])));
				else
						pageable = PageRequest.of(page, size, Sort.by(
							Sort.Order.desc(sortBy[0]),
							Sort.Order.asc(sortBy[1])));
				User user = userRepository.findById(userPrincipal.getId()).orElse(null);
				if(user == null)
						return new PagedResponse<>(Collections.emptyList(), 0,
							0, 0, 0, true);
				if(isActive)
						ordersList = orderRepository.findAllByUserAndStatusIn(user, Arrays.asList(OrderStatus.inProgress, OrderStatus.awaitingPayment,
							OrderStatus.paid, OrderStatus.deliveryInProgress, OrderStatus.courierFound, OrderStatus.courierSearch, OrderStatus.awaitingConfirmation), pageable);
				else
						ordersList = orderRepository.findAllByUserAndStatusIn(user, Arrays.asList(OrderStatus.delivered, OrderStatus.canceled), pageable);
				if(ordersList.getNumberOfElements() == 0)
				{
						return new PagedResponse<>(Collections.emptyList(), ordersList.getNumber(),
							ordersList.getSize(), ordersList.getTotalElements(), ordersList.getTotalPages(), ordersList.isLast());
				}
				List<OrderResponse> responseList = ordersList.map(orders -> new OrderResponse(orders)).getContent();
				return new PagedResponse<>(responseList, ordersList.getNumber(),
					ordersList.getSize(), ordersList.getTotalElements(), ordersList.getTotalPages(), ordersList.isLast());
		}

		public ResponseEntity<?> statusDelivered(UserPrincipal userPrincipal, OrderResponse orderResponse)
		{
			Orders orders = orderRepository.findById(orderResponse.getId()).orElse(null);
			User user = userRepository.findById(userPrincipal.getId()).orElse(null);
			if (user != null && orders != null && user.equals(orders.getUser()))
			{
				switch (orderResponse.getStatus()) {
					case "Ожидает оплаты":
						orders.setStatus(OrderStatus.awaitingPayment);
						break;
					case "Новый":
						orders.setStatus(OrderStatus.NEW);
						break;
					case "В обработке":
						orders.setStatus(OrderStatus.inProgress);
						break;
					case "Оплачен":
						orders.setStatus(OrderStatus.paid);
						break;
					case "Отменен":
						orders.setStatus(OrderStatus.canceled);
						break;
					case "Поиск курьера":
						orders.setStatus(OrderStatus.courierSearch);
						break;
					case "Курьер найден":
						orders.setStatus(OrderStatus.courierFound);
						break;
					case "Выполняется доставка":
						orders.setStatus(OrderStatus.deliveryInProgress);
						break;
					case "Ожидает подтверждения":
						orders.setStatus(OrderStatus.awaitingConfirmation);
						break;
					case "Доставлен":
						orders.setStatus(OrderStatus.delivered);
						break;
				}

				orderRepository.save(orders);
				producer.sendOrderRequest(orders);
				return new ResponseEntity(new ApiResponse(true, "Статус заказа успешно изменен!", new Date(), orderResponse), HttpStatus.OK);
			}
			else
				return new ResponseEntity(new ApiResponse(true, "При изменении статуса заказа произошла ошибка.", new Date(), orderResponse), HttpStatus.BAD_REQUEST);
		}

		private void validatePageNumberAndSize(int page, int size)
		{
			if(page < 0)
			{
				throw new BadRequestException("Номер страницы не может быть меньше нуля.");
			}
			if(size > AppConstants.MAX_PAGE_SIZE)
			{
				throw new BadRequestException("Размер страницы не должен превышать " + AppConstants.MAX_PAGE_SIZE);
			}
		}
}
