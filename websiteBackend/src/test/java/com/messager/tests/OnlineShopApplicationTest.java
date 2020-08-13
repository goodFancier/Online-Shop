package com.messager.tests;

import com.messager.controller.UserController;
import com.messager.model.User;
import com.messager.model.retailer.Retailer;
import com.messager.repository.RetailersRepository;
import com.messager.repository.UserRepository;
import com.messager.service.order.payment.PaymentService;
import com.messager.service.taxiMaster.TaxiOrderProcess;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OnlineShopApplicationTest
{
		@Mock
		UserRepository userRepository;

		@Mock
		UserController userController;

		@Autowired
		RetailersRepository retailersRepository;

		@Autowired
		TaxiOrderProcess taxiOrderProcess;

		@Autowired
		PaymentService paymentService;

		@Before
		public void setUp()
		{
				MockitoAnnotations.initMocks(this);
		}

		@Test
		public void signInTest()
		{
				User user = new User();
				user.setName("user@mail.ru");
				user.setPassword("123456");
				userRepository.save(user);
				verify(userRepository).save(any(User.class));
		}

		@Test
		public void getAllUsersTest()
		{
				userController.getAllUsers();
				verify(userController, times(1)).getAllUsers();
		}

		@Test
		public void findByUserNameOrEmailTest()
		{
				List<User> userList = new ArrayList<>();
				User user = new User();
				user.setName("userName");
				user.setEmail("userEmail@yandex.ru");
				userList.add(user);
				when(userRepository.findAll()).thenReturn(userList);
				verify(userRepository, never()).save(isA(User.class));
		}

		@Test
		public void getAddressTest() throws Exception
		{
				Retailer retailer;
				if(retailersRepository.findById(1L).isPresent())
				{
						retailer = retailersRepository.findById(1L).get();
						taxiOrderProcess.getDeliveryPrice(retailer.getCity(), "Горького 43", retailer.getShippingAddress(), retailer.getTaxiPropertiesList().get(0));
				}
		}
}