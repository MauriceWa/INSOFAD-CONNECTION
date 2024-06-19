package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.ProductVariant;

public class OptionsDTO {
    public long id;

    public String name;

    public double added_price;

    public OptionsDTO(long id,String name, double added_price) {
        this.id = id;
        this.name = name;
        this.added_price = added_price;
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
}
