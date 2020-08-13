package com.messager.repository;

import com.messager.model.Orders;
import com.messager.model.User;
import com.messager.model.enumdto.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Orders, Long>
{
		Optional<Orders> findFirstByStatusAndUser(OrderStatus status, User user);

		List<Orders> findAllByStatusAndPaymentNumberIsNotNull(OrderStatus status);

		List<Orders> findAllByStatusInAndTaxiOrderIdIsNotNull(List<OrderStatus> status);

		Page<Orders> findAllByUser(User user, Pageable pageable);

		Page<Orders> findAllByUserAndStatusIn(User user, List<OrderStatus> statusList, Pageable pageable);
}
