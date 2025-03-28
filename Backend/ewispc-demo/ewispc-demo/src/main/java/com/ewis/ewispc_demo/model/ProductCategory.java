package com.ewis.ewispc_demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Optional: reverse reference
    @OneToMany(mappedBy = "category")
    @JsonIgnore // ⛔ Ignore the reverse relationship in JSON
    private List<Product> products;
}