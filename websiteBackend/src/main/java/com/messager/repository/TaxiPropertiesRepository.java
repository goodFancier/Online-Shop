package com.messager.repository;

import com.messager.model.retailer.Retailer;
import com.messager.model.tm.TaxiProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface TaxiPropertiesRepository extends JpaRepository<TaxiProperties, Long>
{
		Optional<TaxiProperties> findByInternalCode(Long internalCode);
}
