package com.example.todoappdeel3.services;


import com.example.todoappdeel3.models.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {


    public String makeName(List<Product> products){
        List<String> names = new ArrayList<>();
        for(Product product : products){
            names.add(product.getName());
        }

        return String.join(" , ",names);
    }


}
