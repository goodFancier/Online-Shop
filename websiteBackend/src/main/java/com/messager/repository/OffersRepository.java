package com.messager.repository;

import com.messager.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OffersRepository extends JpaRepository<Offer, Long>
{
    Offer findOfferById(Long id);
}
