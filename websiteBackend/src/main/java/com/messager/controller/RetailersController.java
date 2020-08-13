package com.messager.controller;

import com.messager.payload.PagedResponse;
import com.messager.payload.RetailersResponse;
import com.messager.service.RetailersService;
import com.messager.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/retailers")
public class RetailersController {

    @Autowired
    private RetailersService retailersService;

    @GetMapping("/all")
    public PagedResponse<RetailersResponse> getAllRetailers(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                            @RequestParam(defaultValue = "id") String sortBy,
                                                            @RequestParam(defaultValue = "ascend") String sortOrder,
                                                            @RequestParam(value = "city", defaultValue = "") String city)
    {
        return retailersService.getAllRetailers(page, size, sortBy, sortOrder, city);
    }

    @GetMapping("/allCity")
    public List<String> getAllCity()
    {
        return retailersService.findAllCityByRetailers();
    }
}
