package com.ewis.ewispc_demo.repository;

import com.ewis.ewispc_demo.model.Product;
import com.ewis.ewispc_demo.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    ProductCategory findByName(String name); // helpful for lookups

    List<Product> findByCategoryId(Long categoryId);

}