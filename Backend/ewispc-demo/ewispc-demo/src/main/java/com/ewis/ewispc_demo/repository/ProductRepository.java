package com.ewis.ewispc_demo.repository;

import com.ewis.ewispc_demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
<<<<<<< HEAD
    List<Product> findByCategoryId(Long categoryId);
=======

    List<Product> findByCategoryId(Long categoryId);

>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
}

