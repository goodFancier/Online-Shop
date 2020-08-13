package com.messager.repository;

import com.messager.model.Good;
import com.messager.model.User;
import com.messager.model.retailer.Retailer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class GoodRepository
{
		@Autowired
		EntityManager em;

		public Page<Good> findGoodByRetailerAndIsOutdatedAndNameContaining(Retailer retailer, Boolean isOutdated, Pageable pageable, List<String> filterValues)
		{
				CriteriaQuery<Good> criteriaQuery = em.getCriteriaBuilder().createQuery(Good.class);
				Root<Good> root = criteriaQuery.from(Good.class);
				criteriaQuery.select(root);
				List<Predicate> predicateList = new ArrayList<>();
				for(String filterValue : filterValues)
				{
						predicateList.add(em.getCriteriaBuilder().like(root.get("name"), "%" + filterValue + "%"));
				}
				predicateList.add(em.getCriteriaBuilder().equal(root.get("retailer"), retailer));
				predicateList.add(em.getCriteriaBuilder().equal(root.get("isOutdated"), isOutdated));
				criteriaQuery.where(predicateList.toArray(new Predicate[0]));
				TypedQuery<Good> typedQuery = em.createQuery(criteriaQuery);
				long start = pageable.getOffset();
				long end = (start + pageable.getPageSize()) > typedQuery.getResultList().size()? typedQuery.getResultList().size(): (start + pageable.getPageSize());
				return new PageImpl<>(typedQuery.getResultList().subList((int)start, (int)end), pageable, typedQuery.getResultList().size());
		}
}
