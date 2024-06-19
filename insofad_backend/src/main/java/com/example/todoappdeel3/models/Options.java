package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Options {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private double added_price;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_variant_id")
    public ProductVariant productVariant;

    @ManyToMany
    @JsonBackReference
    private List<Order> order;

    @ManyToMany
    @JsonManagedReference
    private List<OrderProduct> orderProductList;



    public Options(String name, double added_price, ProductVariant productVariant) {
        this.name = name;
        this.added_price = added_price;
        this.productVariant = productVariant;
    }


    public Options(){

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

    public double getAdded_price() {
        return added_price;
    }

    public void setAdded_price(double added_price) {
        this.added_price = added_price;
    }

    public ProductVariant getProductVariant() {
        return productVariant;
    }

    public void setProductVariant(ProductVariant productVariant) {
        this.productVariant = productVariant;
    }

    public List<Order> getOrder() {
        return order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }

    public List<OrderProduct> getOrderProductList() {
        return orderProductList;
    }

    public void setOrderProductList(List<OrderProduct> orderProductList) {
        this.orderProductList = orderProductList;
    }
}
