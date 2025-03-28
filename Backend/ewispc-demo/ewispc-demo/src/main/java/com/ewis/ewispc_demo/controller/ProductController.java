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

    // ✅ Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // ✅ Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

<<<<<<< HEAD
    // ✅ Get products by category ID
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getByCategory(categoryId);
    }

    // ✅ Add new product
=======
    @GetMapping("/by-category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }


    //testing only
>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.save(product);
    }

    // Optional: update product
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.update(id, product);
    }

    // Optional: delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }
}