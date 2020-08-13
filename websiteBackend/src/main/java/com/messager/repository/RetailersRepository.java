package com.messager.repository;

import com.messager.model.retailer.Retailer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RetailersRepository extends JpaRepository<Retailer, Long>
{
		Optional<Retailer> findByInternalCode(Long internalCode);

		Page<Retailer> findAllByIsOutdated(Pageable pageable, Boolean isOutdated);

		Page<Retailer> findFirstByIsOutdated(Pageable pageable, Boolean isOutdated);

		Page<Retailer> findAllByIsOutdatedAndCity(Boolean isOutdated, String city, Pageable pageable);

		List<Retailer> findDistinctByIsOutdated(Boolean isOutdated);
}
