package com.messager.service.kafkaConsumer;

import com.messager.model.Orders;
import com.messager.model.User;
import com.messager.model.enumdto.OrderStatus;
import com.messager.model.retailer.Retailer;
import com.messager.payload.retailer.RetailerListResponse;
import com.messager.payload.retailer.RetailerResponse;
import com.messager.repository.OrderDetailsRepository;
import com.messager.repository.OrderRepository;
import com.messager.repository.RetailersRepository;
import com.messager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RetailerConsumerService
{
		@Autowired
		RetailersRepository retailersRepository;

		@Autowired
		OrderRepository orderRepository;

		@Autowired
		OrderDetailsRepository orderDetailsRepository;

		@Autowired
		UserRepository userRepository;

		public void processRetailer(RetailerListResponse retailerListResponse)
		{
				for(RetailerResponse retailerResponse : retailerListResponse.getBrandForProducerList())
				{
						Retailer retailer = retailersRepository.findByInternalCode(retailerResponse.getId()).orElse(null);
						if(retailer == null)
						{
								retailer = new Retailer();
						}
						retailer.setLogo(retailerResponse.getLogo());
						retailer.setName(retailerResponse.getName());
						retailer.setShippingAddress(retailerResponse.getShippingAddress());
						retailer.setOutdated(retailerResponse.getOutdated());
						retailer.setInternalCode(retailerResponse.getId());
						retailer.setCity(retailerResponse.getCity());
						retailer.setPositionX(retailerResponse.getPositionX());
						retailer.setPositionY(retailerResponse.getPositionY());
						if(retailerResponse.getOutdated())
								removeOutdatedGoodsByRetailerFromBuckets(retailer);
						retailersRepository.save(retailer);
				}
		}

		/**
		 * Для очистки корзины по ритейлеру, нам достаточно понять, что хотя бы один товар из корзины принадлежит этому ритейлеру, т.к в корзине
		 * могут находиться товары только одного ритейлера
		 *
		 * @param retailer
		 */
		private void removeOutdatedGoodsByRetailerFromBuckets(Retailer retailer)
		{
				for(User user : userRepository.findAll())
				{
						Orders order = orderRepository.findFirstByStatusAndUser(OrderStatus.NEW, user).orElse(null);
						if(order != null && !order.getOrderDetailList().isEmpty())
						{
								if(order.getOrderDetailList().get(0).getGood().getRetailer().equals(retailer))
										orderDetailsRepository.findAllByOrder(order).forEach(o -> orderDetailsRepository.delete(o));
						}
				}
		}
}
