package com.ewis.ewispc_demo.repository;

import com.ewis.ewispc_demo.model.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSpecificationRepository extends JpaRepository<ProductSpecification, Long> {
}
