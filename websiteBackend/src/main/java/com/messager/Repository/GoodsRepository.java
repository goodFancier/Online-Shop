package com.messager.Repository;

import com.messager.model.Good;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Good, Long>
{
    Good findGoodById(Long id);
}
