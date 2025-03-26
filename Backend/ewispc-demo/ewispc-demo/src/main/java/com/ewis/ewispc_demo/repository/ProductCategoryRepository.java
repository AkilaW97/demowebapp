package com.ewis.ewispc_demo.repository;

import com.ewis.ewispc_demo.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    ProductCategory findByName(String name); // helpful for lookups
}
