package com.messager.repository;

import com.messager.model.Good;
import com.messager.model.OrderDetails;
import com.messager.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>
{
		List<OrderDetails> findAllByOrder(Orders order);

		Optional<OrderDetails> findByGoodAndOrder(Good good, Orders order);
}
