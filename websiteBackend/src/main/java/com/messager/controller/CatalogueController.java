package com.messager.controller;

import com.messager.service.CatalogueService;
import com.messager.model.Good;
import com.messager.payload.PagedResponse;
import com.messager.payload.good.GoodResponseForRetailer;
import com.messager.repository.GoodsRepository;
import com.messager.repository.RetailersRepository;
import com.messager.repository.UserRepository;
import com.messager.security.CurrentUser;
import com.messager.security.UserPrincipal;
import com.messager.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CatalogueController
{
		@Autowired
		private GoodsRepository goodsRepository;

		@Autowired
		private UserRepository userRepository;

		@Autowired
		private RetailersRepository retailersRepository;

		@Autowired
		private CatalogueService catalogueService;

		@GetMapping("/getCatalogueOfGoods")
		public PagedResponse<GoodResponseForRetailer> getCatalogueOfGoods(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(defaultValue = "updatedAt") String sortBy,
			@RequestParam(defaultValue = "descend") String sortOrder)
		{
				return catalogueService.getCatalogueOfGoods(page, size, sortBy, sortOrder);
		}

		@GetMapping("/getGoodById")
		public Good getGoodById(@RequestParam(value = "goodId") String goodId)
		{
				return goodsRepository.findGoodById(Long.valueOf(goodId));
		}

		@GetMapping("/getGoodsByRetailers")
		public PagedResponse<GoodResponseForRetailer> getGoodsByRetailers(
			@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "retailersId") Long id,
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(defaultValue = "updatedAt") String sortBy,
			@RequestParam(defaultValue = "descend") String sortOrder,
			@RequestParam String filterValue)
		{
						return catalogueService.getGoodsByRetailers(userPrincipal, id, page, size, sortBy, sortOrder, filterValue);
		}
}
