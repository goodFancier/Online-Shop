package com.messager.Repository;

import com.messager.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OffersRepository extends JpaRepository<Offer, Long>
{
}
