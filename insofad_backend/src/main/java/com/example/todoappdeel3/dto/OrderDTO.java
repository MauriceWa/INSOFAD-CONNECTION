package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.Product;

import java.util.List;

public class OrderDTO {
    public String email;

    public List<ProductDTO> products;

    public OrderDTO(String email, List<ProductDTO> products) {
        this.email = email;
        this.products = products;
    }

}
