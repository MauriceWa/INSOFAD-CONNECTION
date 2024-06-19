package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.Options;
import com.example.todoappdeel3.models.Product;

import java.util.List;

public class ProductVariantDTO {

    public long id;

    public String name;

    public String description;

    public List<OptionsDTO> options;

    public ProductVariantDTO(long id, String name, String description, List<OptionsDTO> options) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.id = id;
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

    public List<OptionsDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionsDTO> options) {
        this.options = options;
    }
}
