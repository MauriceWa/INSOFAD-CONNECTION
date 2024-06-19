package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(length = 500)
    private String description;
    private double price;
    @Column(nullable = false)
    private int amount;
    private String imgURL;
    @Column(length = 500)
    private String specifications;
    private String releaseDate;
    private String publisher;
    private String durability;
    private String fitting;
    private Integer quantity;
    private boolean isFinished = false;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    @Nullable
    private Category category;

    @ManyToMany
    @JsonBackReference
    private List<Order> orders; // Renamed from order to orders

    @OneToMany(mappedBy = "orderItem")
    @JsonManagedReference
    public Set<ProductVariant> variants;

    @OneToMany
    @JsonManagedReference
    public List<OrderProduct> orderProducts;

    public Product() {
    }

    public Product(int amount, String name, String description, double price, String imgURL, Category category, String specifications, String releaseDate, String publisher, String durability, String fitting, Integer quantity) {
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgURL = imgURL;
        this.category = category;
        this.specifications = specifications;
        this.releaseDate = releaseDate;
        this.publisher = publisher;
        this.durability = durability;
        this.fitting = fitting;
        this.quantity = quantity;
    }

    // Getters and setters for new fields
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

    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isFinished() {
        return isFinished;
    }
    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    // Existing getters and setters
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

    public int getAmount() {
        return amount;
    }
    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getImgURL() {
        return imgURL;
    }
    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

    public String getSpecifications() {
        return specifications;
    }
    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getReleaseDate() {
        return releaseDate;
    }
    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPublisher() {
        return publisher;
    }
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public List<Order> getOrders() {
        return orders;
    }
    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Set<ProductVariant> getVariants() {
        return variants;
    }
    public void setVariants(Set<ProductVariant> variants) {
        this.variants = variants;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }
    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
