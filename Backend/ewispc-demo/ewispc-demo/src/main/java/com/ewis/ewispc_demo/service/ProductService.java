package com.ewis.ewispc_demo.service;

import com.ewis.ewispc_demo.model.Product;
import com.ewis.ewispc_demo.model.ProductSpecification;
import com.ewis.ewispc_demo.repository.ProductCategoryRepository;
import com.ewis.ewispc_demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product save(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            var category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category); // Set managed entity
        } else {
            throw new RuntimeException("Product must have a category");
        }

        // set back-references for specs
        if (product.getSpecifications() != null) {
            product.getSpecifications().forEach(spec -> spec.setProduct(product));
        }
        return productRepository.save(product);
    }

    public List<Product> getByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Transactional
    public Product update(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setImageUrl(updatedProduct.getImageUrl());

            // Instead of replacing the list, clear and rebuild it
            existing.getSpecifications().clear();

            if (updatedProduct.getSpecifications() != null) {
                for (ProductSpecification spec : updatedProduct.getSpecifications()) {
                    spec.setProduct(existing); // important: set the back-reference!
                    existing.getSpecifications().add(spec); // add to existing list
                }
            }
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

<<<<<<< HEAD
=======
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

<<<<<<< HEAD
}
=======

}
>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
