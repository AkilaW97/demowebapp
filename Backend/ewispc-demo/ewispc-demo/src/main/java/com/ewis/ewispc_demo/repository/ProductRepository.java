package com.ewis.ewispc_demo.repository;

import com.ewis.ewispc_demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
