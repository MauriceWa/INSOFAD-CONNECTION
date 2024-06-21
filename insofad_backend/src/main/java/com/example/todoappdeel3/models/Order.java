package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String name;
    private String lastName;
    private String zipcode;
    private int houseNumber;
    private String notes;
    private int totalProducts;
    private LocalDateTime orderDate;
    private double total;
    private double topUpAmount;

    private String orderTitle;
    private double orderPrice;
    public LocalDateTime datum;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    private CustomUser customUser;

    @ManyToMany
    @JoinTable(name = "product_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "giftcard_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "giftcard_id"))
    private Set<GiftCard> giftCards = new HashSet<>();

    @ElementCollection
    private Set<String> cardsToppedUp = new HashSet<>();

    @ElementCollection
    private Set<String> appliedGiftCards = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderProduct> orderProducts;

    public Order() {
    }

    public Order(String orderTitle, double orderPrice, LocalDateTime datum, List<OrderProduct> orderProducts) {
        this.orderTitle = orderTitle;
        this.orderPrice = orderPrice;
        this.datum = datum;
        this.orderProducts = orderProducts;
    }


    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public double getTopUpAmount() {
        return topUpAmount;
    }

    public void setTopUpAmount(double topUpAmount) {
        this.topUpAmount = topUpAmount;
    }

    public String getOrderTitle() {
        return orderTitle;
    }

    public void setOrderTitle(String orderTitle) {
        this.orderTitle = orderTitle;
    }

    public double getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(double orderPrice) {
        this.orderPrice = orderPrice;
    }

    public LocalDateTime getDatum() {
        return datum;
    }

    public void setDatum(LocalDateTime datum) {
        this.datum = datum;
    }

    public CustomUser getCustomUser() {
        return customUser;
    }

    public void setCustomUser(CustomUser customUser) {
        this.customUser = customUser;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<GiftCard> getGiftCards() {
        return giftCards;
    }

    public void setGiftCards(Set<GiftCard> giftCards) {
        this.giftCards = giftCards;
    }

    public Set<String> getCardsToppedUp() {
        return cardsToppedUp;
    }

    public void setCardsToppedUp(Set<String> cardsToppedUp) {
        this.cardsToppedUp = cardsToppedUp;
    }

    public Set<String> getAppliedGiftCards() {
        return appliedGiftCards;
    }

    public void setAppliedGiftCards(Set<String> appliedGiftCards) {
        this.appliedGiftCards = appliedGiftCards;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
