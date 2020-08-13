package com.messager.service;

import com.messager.exception.BadRequestException;
import com.messager.model.retailer.Retailer;
import com.messager.payload.PagedResponse;
import com.messager.payload.RetailersResponse;
import com.messager.repository.RetailersRepository;
import com.messager.utils.AppConstants;
import com.messager.utils.RetailersUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RetailersService
{
		@Autowired
		private RetailersRepository retailersRepository;

		@Autowired
		private RetailersUtils retailersUtils;

		public PagedResponse<RetailersResponse> getAllRetailers(int page, int size, String sortBy, String sortOrder, String city)
		{
				validatePageNumberAndSize(page, size);
				Pageable pageable;
				Page<Retailer> retailersPage;
				if(sortOrder.equals("ascend"))
						pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
				else
						pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
				if(city.isEmpty())
						retailersPage = retailersRepository.findAllByIsOutdatedAndCity(false, !findAllCityByRetailers().isEmpty()? this.findAllCityByRetailers().get(0): "", pageable);
				else
						retailersPage = retailersRepository.findAllByIsOutdatedAndCity(false, city, pageable);
				if(retailersPage.getNumberOfElements() == 0)
				{
						return new PagedResponse<>(Collections.emptyList(), retailersPage.getNumber(),
							retailersPage.getSize(), retailersPage.getTotalElements(), retailersPage.getTotalPages(), retailersPage.isLast());
				}
				retailersUtils.initRetailersImages(retailersPage);
				List<RetailersResponse> responseList = retailersPage.map(retailers -> new RetailersResponse(retailers)).getContent();
				return new PagedResponse<>(responseList, retailersPage.getNumber(),
					retailersPage.getSize(), retailersPage.getTotalElements(), retailersPage.getTotalPages(), retailersPage.isLast());
		}

		public List<String> findAllCityByRetailers()
		{
				List<String> cityList = new ArrayList<>();
				List<Retailer> retailersPage = retailersRepository.findDistinctByIsOutdated(false);
				retailersPage.stream().filter(retailer -> retailer.getCity() != null && !retailer.getCity().equals("")).sorted(Comparator.comparing(Retailer::getCity)).forEach(retailer -> cityList.add(retailer.getCity()));
				return cityList.stream().distinct().collect(Collectors.toList());
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
