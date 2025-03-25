package com.ewis.ewispc_demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String key;   // e.g., "RAM"
    private String value; // e.g., "16GB"

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
