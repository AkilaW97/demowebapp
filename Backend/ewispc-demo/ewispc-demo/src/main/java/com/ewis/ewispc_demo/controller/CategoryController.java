package com.ewis.ewispc_demo.controller;

import com.ewis.ewispc_demo.model.ProductCategory;
import com.ewis.ewispc_demo.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private ProductCategoryRepository categoryRepository;

    // Get all categories (for dropdowns)
    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get categories by ID
    @GetMapping("/{id}")
    public ProductCategory getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

    // Add new category
    @PostMapping
    public ProductCategory createCategory(@RequestBody ProductCategory category) {
        return categoryRepository.save(category);
    }
}