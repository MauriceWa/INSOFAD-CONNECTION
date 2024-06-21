//package com.example.todoappdeel3.models;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.*;
//
//import java.time.LocalDateTime;
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//public class PlacedOrder {
//    @Id
//    @GeneratedValue
//    private long id;
//
//    @Column(nullable = true)
//    private String name;
//    @Column(nullable = true)
//    private String last_name;
//    @Column(nullable = true)
//    private String zipcode;
//    @Column(nullable = true)
//    private int houseNumber;
//    @Column(nullable = true)
//    private String notes;
//
//    @Column(nullable = true)
//    private int totalProducts;
//    @Column(nullable = true)
//    private LocalDateTime orderDate;
//
//    @Column(nullable = false)
//    private double total;
//
//    @Column(nullable = false)
//    private double top_up_amount;
//
//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JsonBackReference
//    private CustomUser user;
//
//    @ElementCollection
//    private Set<String> cardsToppedUp = new HashSet<>();
//
//    @ElementCollection
//    private Set<String> appliedGiftCards = new HashSet<>();
//
//    @ManyToMany
//    @JoinTable(name = "product_order",
//            joinColumns = @JoinColumn(name = "order_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id"))
//    private Set<Product> products = new HashSet<>();
//
//    @ManyToMany
//    @JoinTable(name = "giftcard_order",
//            joinColumns = @JoinColumn(name = "order_id"),
//            inverseJoinColumns = @JoinColumn(name = "giftcard_id"))
//    private Set<GiftCard> giftCards = new HashSet<>();
//
//
//    public PlacedOrder() {
//    }
//
//
//    public PlacedOrder(long id, String name, String infix, String last_name, String zipcode, int houseNumber, String notes, int totalProducts, LocalDateTime orderDate, double top_up_amount, double total, CustomUser user, Set<String> cardsToppedUp , Set<String> appliedGiftCards  , Set<Product> products, Set<GiftCard> giftCards) {
//        this.id = id;
//        this.name = name;
//        this.last_name = last_name;
//        this.zipcode = zipcode;
//        this.houseNumber = houseNumber;
//        this.notes = notes;
//        this.totalProducts = totalProducts;
//        this.orderDate = orderDate;
//        this.total = total;
//        this.top_up_amount = top_up_amount;
//        this.user = user;
//        this.appliedGiftCards = appliedGiftCards;
//        this.products = products;
//        this.giftCards = giftCards;
//        this.cardsToppedUp = cardsToppedUp;
//    }
//
//
//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getLast_name() {
//        return last_name;
//    }
//
//    public void setLast_name(String last_name) {
//        this.last_name = last_name;
//    }
//
//    public String getZipcode() {
//        return zipcode;
//    }
//
//    public void setZipcode(String zipcode) {
//        this.zipcode = zipcode;
//    }
//
//    public int getHouseNumber() {
//        return houseNumber;
//    }
//
//    public void setHouseNumber(int houseNumber) {
//        this.houseNumber = houseNumber;
//    }
//
//    public String getNotes() {
//        return notes;
//    }
//
//    public void setNotes(String notes) {
//        this.notes = notes;
//    }
//
//    public int getTotalProducts() {
//        return totalProducts;
//    }
//
//    public void setTotalProducts(int totalProducts) {
//        this.totalProducts = totalProducts;
//    }
//
//    public LocalDateTime getOrderDate() {
//        return orderDate;
//    }
//
//    public void setOrderDate(LocalDateTime orderDate) {
//        this.orderDate = orderDate;
//    }
//
//    public double getTotal() {
//        return total;
//    }
//
//    public void setTotal(double total) {
//        this.total = total;
//    }
//
//    public double getTop_up_amount() {
//        return top_up_amount;
//    }
//
//    public void setTop_up_amount(double top_up_amount) {
//        this.top_up_amount = top_up_amount;
//    }
//
//    public CustomUser getUser() {
//        return user;
//    }
//
//    public void setUser(CustomUser user) {
//        this.user = user;
//    }
//
//    public Set<Product> getProducts() {
//        return products;
//    }
//
//    public void setProducts(Set<Product> products) {
//        this.products = products;
//    }
//
//    public Set<GiftCard> getGiftCards() {
//        return giftCards;
//    }
//
//    public void setGiftCards(Set<GiftCard> giftCards) {
//        this.giftCards = giftCards;
//    }
//
//    public Set<String> getAppliedGiftCards() {
//        return appliedGiftCards;
//    }
//
//    public void setAppliedGiftCards(Set<String> appliedGiftCards) {
//        this.appliedGiftCards = appliedGiftCards;
//    }
//
//    public Set<String> getCardsToppedUp() {
//        return cardsToppedUp;
//    }
//
//    public void setCardsToppedUp(Set<String> cardsToppedUp) {
//        this.cardsToppedUp = cardsToppedUp;
//    }
//}
