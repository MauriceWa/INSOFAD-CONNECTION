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
    private Long id;
    private String name;
    private double price;
    private String description;
    private String durability;
    private String fitting;
    private String imageUrl;
    private Integer quantity;
    private boolean isFinished = false;

    @ManyToMany
    @JsonBackReference
    private List<Order> order;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    @Nullable
    private Category category;


    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    public Set<ProductVariant> variants;

    @OneToMany
    @JsonManagedReference
    public List<OrderProduct> orderProducts;



    public Product() {

    }

    public Product(String name, String description, double price, Category category, String durability, String fitting, String imageUrl, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.durability = durability;
        this.fitting = fitting;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }


    public Category getCategory() {
        return category;
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

    public String getImageURL() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    public List<Order> getOrder() {
        return order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }

    public Set<ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(Set<ProductVariant> variants) {
        this.variants = variants;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }


}
