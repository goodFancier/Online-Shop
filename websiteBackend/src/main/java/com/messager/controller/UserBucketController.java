package com.messager.controller;

import com.messager.payload.good.GoodQuantityResponse;
import com.messager.repository.OrderRepository;
import com.messager.security.CurrentUser;
import com.messager.security.UserPrincipal;
import com.messager.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserBucketController
{
		@Autowired
		OrderRepository orderRepository;

		@Autowired
		OrderDetailsService orderDetailsService;

		@PostMapping("/deleteFromUserBucket")
		public String deleteFromUserBucket(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "goodId") Long goodId)
		{
				return orderDetailsService.deleteFromUserBucket(userPrincipal, goodId);
		}

		@PostMapping("/setGoodQuantity")
		public String setGoodQuantity(@CurrentUser UserPrincipal userPrincipal, @RequestBody GoodQuantityResponse goodQuantityResponse)
		{
				return orderDetailsService.setGoodQuantity(userPrincipal, goodQuantityResponse);
		}

		@GetMapping("/addToBucket")
		public void addToBucket(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "goodId") Long goodId)
		{
				orderDetailsService.addToBucket(userPrincipal, goodId);
		}

		@PostMapping("/getUserGoods")
		public String getUserGoods(@CurrentUser UserPrincipal userPrincipal)
		{
				return orderDetailsService.getUserGoods(userPrincipal);
		}
}
