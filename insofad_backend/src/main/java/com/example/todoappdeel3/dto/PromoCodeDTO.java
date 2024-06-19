package com.example.todoappdeel3.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.time.LocalDate;

public class PromoCodeDTO {
    public String code;
    public int discount;
    @JsonAlias("expiry_date")
    public LocalDate expiryDate;

    public PromoCodeDTO(String code, int discount, LocalDate expiryDate) {
        this.code = code;
        this.discount = discount;
        this.expiryDate = expiryDate;
    }
}
