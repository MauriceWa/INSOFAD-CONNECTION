package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "orderProducts")
public class OrderProduct {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JsonBackReference
    private Product product;

    @ManyToMany

    private List<Options> options;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference
    private Order order;


    public OrderProduct(Product product, List<Options> options) {
        this.product = product;
        this.options = options;
    }

    public OrderProduct(){

    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<Options> getOptions() {
        return options;
    }

    public void setOptions(List<Options> options) {
        this.options = options;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }



}
