package com.messager.service.kafkaConsumer;

import com.messager.model.Good;
import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import com.messager.model.User;
import com.messager.model.enumdto.OrderStatus;
import com.messager.model.retailer.Retailer;
import com.messager.payload.good.GoodListResponse;
import com.messager.payload.good.GoodResponse;
import com.messager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodConsumerService
{
		@Autowired
		GoodsRepository goodsRepository;

		@Autowired
		RetailersRepository retailersRepository;

		@Autowired
		OrderDetailsRepository orderDetailsRepository;

		@Autowired
		OrderRepository orderRepository;

		@Autowired
		UserRepository userRepository;

		public void goodProcess(GoodListResponse goodListResponse)
		{
				for(GoodResponse goodResponse : goodListResponse.getGoodListResponse())
				{
						Retailer retailer = retailersRepository.findByInternalCode(goodResponse.getRetailer()).orElse(null);
						if(retailer == null)
								continue;
						List<Good> existGoods = goodsRepository.findByInternalCodeAndRetailer(goodResponse.getInternalCode(), retailer);
						if(!existGoods.isEmpty())
						{
								existGoods.forEach(o -> {
										o.setOutdated(true);
										goodsRepository.save(o);
								});
								removeOutdatedGoodsFromBuckets(existGoods);
						}
						if(goodResponse.getOutdated() != null && !goodResponse.getOutdated())
						{
								Good good = new Good(
									goodResponse.getName(),
									goodResponse.getPrice(),
									goodResponse.getImage(),
									goodResponse.getIngredients(),
									retailersRepository.findByInternalCode(goodResponse.getRetailer()).orElse(null),
									goodResponse.getInternalCode());
								goodsRepository.save(good);
						}
				}
		}

		private void removeOutdatedGoodsFromBuckets(List<Good> outdatedGoods)
		{
				for(Good good : outdatedGoods)
				{
						for(User user : userRepository.findAll())
						{
								orderRepository.findFirstByStatusAndUser(OrderStatus.NEW, user)
									.flatMap(order -> orderDetailsRepository.findByGoodAndOrder(good, order))
									.ifPresent(orderDetails -> orderDetailsRepository.delete(orderDetails));
						}
				}
		}
}
