package com.ewis.ewispc_demo.controller;

import com.ewis.ewispc_demo.model.Product;
import com.ewis.ewispc_demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    @GetMapping("/by-category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }


    //testing only
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.save(product);
    }

}
