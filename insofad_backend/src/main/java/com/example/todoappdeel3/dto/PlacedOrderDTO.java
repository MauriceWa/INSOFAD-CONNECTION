package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.CustomUser;
import com.example.todoappdeel3.models.TopUp;

import java.time.LocalDateTime;
import java.util.Set;

public class PlacedOrderDTO {
    private long id;
    private String name;
    private String lastName;
    private String zipcode;
    private int houseNumber;
    private String notes;
    private int totalProducts;
    private LocalDateTime orderDate;
    private double total;
    private CustomUser user;
    private Set<String> appliedGiftCards;
    private Set<TopUp> topUps;
    private Set<ProductDTO> products;
    private Set<GiftCardDTO> giftCards;

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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public int getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public CustomUser getUser() {
        return user;
    }

    public void setUser(CustomUser user) {
        this.user = user;
    }

    public Set<String> getAppliedGiftCards() {
        return appliedGiftCards;
    }

    public void setAppliedGiftCards(Set<String> appliedGiftCards) {
        this.appliedGiftCards = appliedGiftCards;
    }

    public Set<TopUp> getTopUps() {
        return topUps;
    }

    public void setTopUps(Set<TopUp> topUps) {
        this.topUps = topUps;
    }

    public Set<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductDTO> products) {
        this.products = products;
    }

    public Set<GiftCardDTO> getGiftCards() {
        return giftCards;
    }

    public void setGiftCards(Set<GiftCardDTO> giftCards) {
        this.giftCards = giftCards;
    }


}
