package com.example.todoappdeel3.dto;

import java.util.List;

public class OrderDTO {
    private String email;
    private List<Long> productIds;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
    }
}
