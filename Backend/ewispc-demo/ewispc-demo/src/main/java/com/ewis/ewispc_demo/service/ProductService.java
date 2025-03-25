package com.ewis.ewispc_demo.service;

import com.ewis.ewispc_demo.model.Product;
import com.ewis.ewispc_demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    //tesing only
    public Product save(Product product) {
        return productRepository.save(product);
    }

}
