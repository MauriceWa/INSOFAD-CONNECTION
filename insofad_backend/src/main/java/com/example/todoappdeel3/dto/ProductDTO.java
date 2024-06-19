package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.ProductVariant;
import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.List;
import java.util.Set;


public class ProductDTO {

    public long id;

    public String name;
    public String description;
    public double price;
    public String durability;
    public String fitting;
    public String imageUrl;
    public Integer quantity;

    public Set<ProductVariantDTO> variants;


    public ProductDTO(String name, String description, double price, String durability, String fitting, String imageUrl, Integer quantity, Set<ProductVariantDTO> variants) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.durability = durability;
        this.fitting = fitting;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
//      this.categoryId = categoryId;
        this.variants = variants;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDurability() {
        return durability;
    }

    public void setDurability(String durability) {
        this.durability = durability;
    }

    public String getFitting() {
        return fitting;
    }

    public void setFitting(String fitting) {
        this.fitting = fitting;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<ProductVariantDTO> getVariants() {
        return variants;
    }

    public void setVariants(Set<ProductVariantDTO> variants) {
        this.variants = variants;
    }
}
