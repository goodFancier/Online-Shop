package com.messager.controller;

import com.google.gson.Gson;
import com.messager.kafkaService.Producer;
import com.messager.model.Good;
import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import com.messager.model.User;
import com.messager.model.enumdto.OrderStatus;
import com.messager.model.retailer.Retailer;
import com.messager.payload.ApiResponse;
import com.messager.payload.PagedResponse;
import com.messager.payload.good.GoodOrderDetailsResponse;
import com.messager.payload.order.OrderRequest;
import com.messager.payload.order.OrderResponse;
import com.messager.payload.payment.PaymentBtnRespone;
import com.messager.repository.GoodsRepository;
import com.messager.repository.OrderRepository;
import com.messager.repository.OrderDetailsRepository;
import com.messager.repository.UserRepository;
import com.messager.security.CurrentUser;
import com.messager.security.UserPrincipal;
import com.messager.service.order.OrderService;
import com.messager.service.order.payment.PaymentService;
import com.messager.service.taxiMaster.TaxiOrderProcess;
import com.messager.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController
{
		@Autowired
		private OrderRepository orderRepository;

		@Autowired
		private UserRepository userRepository;

		@Autowired
		private OrderDetailsRepository orderDetailsRepository;

		@Autowired
		private TaxiOrderProcess taxiOrderProcess;

		@Autowired
		private Producer producer;

		@Autowired
		private OrderService orderService;

		@Autowired
		private GoodsRepository goodsRepository;

		@Autowired
		private PaymentService paymentService;

		@GetMapping("/order/getAllUserOrders")
		public PagedResponse<OrderResponse> getAllUserOrders(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(defaultValue = "createdAt") String sortBy,
			@RequestParam(defaultValue = "descend") String sortOrder,
			@RequestParam(value = "isActive", defaultValue = "true") Boolean isActive,
			@CurrentUser UserPrincipal userPrincipal)
		{
				return orderService.getAllUserOrders(page, size, sortOrder, isActive, userPrincipal, "status", sortBy);
		}

		@PostMapping("/order/getPayUrl")
		public ResponseEntity<?> getPayUrl(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderResponse orderResponse) throws Exception
		{
				Gson gson = new Gson();
				PaymentBtnRespone paymentBtnRespone = gson.fromJson(paymentService.makeAnonymousPayment(orderResponse), PaymentBtnRespone.class);
				if(paymentBtnRespone.getCode() != null && paymentBtnRespone.getCode().equals("1297"))
						return new ResponseEntity(new ApiResponse(true, paymentBtnRespone.getUserMessage(), new Date(), paymentBtnRespone), HttpStatus.INTERNAL_SERVER_ERROR);
				Orders order = orderRepository.findById(orderResponse.getId()).orElse(null);
				if(order != null)
				{
						order.setPaymentNumber(paymentBtnRespone.getRegPayNum());
						orderRepository.save(order);
						return new ResponseEntity(new ApiResponse(true, "Запрос на повторное создание заказа успешно создан!", new Date(), paymentBtnRespone), HttpStatus.OK);
				}
				else
						return new ResponseEntity(new ApiResponse(true, "Не удалось оплатить заказ, пожалуйста попробуйте позднее!", new Date(), paymentBtnRespone), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		@PostMapping("/order/createOrder")
		public void createOrder(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderRequest orderRequest)
		{
				User user = userRepository.findById(userPrincipal.getId()).orElse(null);
				Orders userBucket = orderRepository.findFirstByStatusAndUser(OrderStatus.NEW, user).orElse(null);
				Orders order = new Orders();
				order.setStatus(OrderStatus.inProgress);
				order.setUser(user);
				order.setName(orderRequest.getName());
				order.setAdditionalPhone(orderRequest.getAdditionalPhone());
				order.setDeliveryPrice(orderRequest.getDeliveryPrice());
				order.setEmail(orderRequest.getEmail());
				order.setAddress(orderRequest.getAddress());
				order.setComment(orderRequest.getComment());
				List<OrderDetails> orderDetailsList = orderDetailsRepository.findAllByOrder(userBucket);
				orderRepository.save(order);
				for(OrderDetails orderDetails : orderDetailsList)
				{
						orderDetails.setOrder(order);
						orderDetailsRepository.save(orderDetails);
				}
				order.setOrderDetailList(orderDetailsList);
				producer.sendOrderRequest(order);
		}

		@PostMapping("/order/getDeliveryPrice")
		public ResponseEntity<?> getDeliveryPrice(@RequestBody String address, @CurrentUser UserPrincipal currentUser) throws Exception
		{
				User user = userRepository.findById(currentUser.getId()).orElse(null);
				if(user != null)
				{
						Orders order = orderRepository.findFirstByStatusAndUser(OrderStatus.NEW, user).orElse(null);
						if(order != null)
						{
								Retailer retailer = order.getOrderDetailList().stream().map(OrderDetails::getGood).map(Good::getRetailer).findFirst().orElse(null);
								if(retailer != null)
										//TODO: тут временная заглушка на getTaxiPropertiesList().get(0), т.к не понятно пока какие проперти выбирать
										try
										{
												return new ResponseEntity(new ApiResponse(false, "Указанный адрес успешно найден!", new Date(),
													taxiOrderProcess.getDeliveryPrice(retailer.getCity(), address, retailer.getShippingAddress(), retailer.getTaxiPropertiesList().get(0))), HttpStatus.OK);
										}
										catch(Exception e)
										{
												return new ResponseEntity(new ApiResponse(false, "Не удалось найти указанный адрес!", new Date(),
													taxiOrderProcess.getDeliveryPrice(retailer.getCity(), address, retailer.getShippingAddress(), retailer.getTaxiPropertiesList().get(0))), HttpStatus.INTERNAL_SERVER_ERROR);
										}
						}
				}
				return null;
		}

		@PostMapping("/order/updateOrder")
		public ResponseEntity<?> updateOrder(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderResponse orderResponse)
		{
				return orderService.statusDelivered(userPrincipal, orderResponse);
		}

		@PostMapping("/order/repeatOrderRequest")
		public ResponseEntity<?> repeatOrder(@CurrentUser UserPrincipal currentUser, @RequestBody List<GoodOrderDetailsResponse> detailsResponseList)
		{
				boolean isGoodExists = true;
				User user = userRepository.findById(currentUser.getId()).orElse(null);
				if(user != null)
				{
						Orders bucket = orderRepository.findFirstByStatusAndUser(OrderStatus.NEW, user).orElse(null);
						if(bucket == null)
						{
								bucket = new Orders();
								bucket.setUser(user);
								bucket.setStatus(OrderStatus.NEW);
								orderRepository.save(bucket);
						}
						//TODO: если уже есть товары в корзине, то спрашивать перед тем как чистить корзину
						List<OrderDetails> bucketGoods = orderDetailsRepository.findAllByOrder(bucket);
						for(OrderDetails orderDetails : bucketGoods)
						{
								orderDetailsRepository.delete(orderDetails);
						}
						for(GoodOrderDetailsResponse goodOrderDetailsResponse : detailsResponseList)
						{
								List<Good> goodList = goodsRepository.findAllByInternalCodeAndIsOutdated(goodOrderDetailsResponse.getInternalCode(), false);
								if(!goodList.isEmpty())
								{
										Good good = goodsRepository.findAllByInternalCodeAndIsOutdated(goodOrderDetailsResponse.getInternalCode(), false).get(0);
										OrderDetails orderDetails = new OrderDetails();
										orderDetails.setOrder(bucket);
										orderDetails.setGood(good);
										orderDetails.setQuantity(goodOrderDetailsResponse.getQuantity());
										orderDetailsRepository.save(orderDetails);
								}
								else
										isGoodExists = false;
						}
				}
				if(!isGoodExists)
						return new ResponseEntity(new ApiResponse(false, "Извините, некоторых товаров уже нет в магазине!"), HttpStatus.INTERNAL_SERVER_ERROR);
				else
						return new ResponseEntity(new ApiResponse(true, "Запрос на повторное создание заказа успешно создан!"), HttpStatus.OK);
		}
}
