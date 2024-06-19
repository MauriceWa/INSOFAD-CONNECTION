package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.models.ProductVariant;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductVariantDAO {

    private final ProductVariantRepository productVariantRepository;

    public ProductVariantDAO(ProductVariantRepository productVariantRepository) {
        this.productVariantRepository = productVariantRepository;
    }

    public List<ProductVariant> getAllProductVariant(){
        return this.productVariantRepository.findAll();
    }



}
