package com.example.todoappdeel3.dto;


import java.time.LocalDate;

public class GiftCardDTO {
    private String code;
    private String recipientEmail;
    private double amount;
    private double balance;
    private LocalDate expiryDate;

    public GiftCardDTO() {
    }

    public GiftCardDTO(String code, String recipientEmail, double amount, double balance, LocalDate expiryDate) {
        this.code = code;
        this.recipientEmail = recipientEmail;
        this.amount = amount;
        this.balance = balance;
        this.expiryDate = expiryDate;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
}
