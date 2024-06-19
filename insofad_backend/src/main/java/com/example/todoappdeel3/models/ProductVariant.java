package com.example.todoappdeel3.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class ProductVariant {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private String description;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    private Product product;

    @ManyToMany
    @JsonBackReference
    private List<Order> order;


    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    public Set<Options> options;


    public ProductVariant(String name, String description, Product product) {
        this.name = name;
        this.description = description;
        this.product = product;
    }

    public ProductVariant(long id, String name, String description, Product product) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.product = product;
    }



    public ProductVariant(){

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Set<Options> getOptions() {
        return options;
    }

    public void setOptions(Set<Options> options) {
        this.options = options;
    }

    public List<Order> getOrder() {
        return order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }


}
