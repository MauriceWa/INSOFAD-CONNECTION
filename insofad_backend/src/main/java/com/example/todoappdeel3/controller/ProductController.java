package com.example.todoappdeel3.controller;


import com.example.todoappdeel3.dao.ProductDAO;
import com.example.todoappdeel3.dao.ProductRepository;
import com.example.todoappdeel3.dto.*;
import com.example.todoappdeel3.models.Product;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.module.ResolutionException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductController {

    private final ProductDAO productDAO;

    private final ProductRepository productRepository;

    public ProductController(ProductDAO productDAO, ProductRepository productRepository) {
        this.productDAO = productDAO;
        this.productRepository = productRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(this.productDAO.getAllProducts());
    }

    @GetMapping(params = "categoryId")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam(required = false) String category) {
        List<Product> products;
        if (category != null && !category.isEmpty()) {
            products = productRepository.findByCategoryName(category);
        } else {
            products = productRepository.findAll();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductId(@PathVariable Long id){
        try {
            Product product = this.productDAO.getProduct(id);
            return ResponseEntity.ok(product);
        } catch (ResolutionException e) {
            return ResponseEntity.badRequest().build();
        }
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @PostMapping
//    public ResponseEntity<String> createProduct(@RequestBody ProductDTO productDTO){
//        this.productDAO.createProduct(productDTO);
//        return ResponseEntity.ok("Created a product");
//    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{productId}/updateproduct")
    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO){
        this.productDAO.updateProduct(productId, productDTO);

        return ResponseEntity.ok("Updated product with id" + productId);
    }

    @PutMapping("check/{id}")
    public ResponseEntity<String> checkProduct(@PathVariable Long id){
        this.productDAO.checkProduct(id);

        return ResponseEntity.ok("Product checked with id " + id);
    }

    @PutMapping("uncheck/{id}")
    public ResponseEntity<String> uncheckProduct(@PathVariable Long id){
        this.productDAO.uncheckProduct(id);

        return ResponseEntity.ok("Product uncheck with id " + id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        this.productDAO.deleteById(id);

        return ResponseEntity.ok("Product deleted with id " + id);
    }


    @PostMapping ("/deleteVariants")
    public ResponseEntity<String> deleteVariantOptions(@RequestBody DeleteVariantOptionsDTO deleteVariantOptionsDTO){
        this.productDAO.deleteVariantOptions(deleteVariantOptionsDTO);
        return ResponseEntity.ok("Product variant and options deleted ");
    }

    @PostMapping("/{productId}/addVariants")
    public ResponseEntity<String> AddVariantOptions(@PathVariable Long productId, @RequestBody ProductDTO productDTO){
        this.productDAO.AddVariantOptions(productId, productDTO);
        return ResponseEntity.ok("Product variant and options are added to a product ");
    }


    @PostMapping ("/{productId}/updateVariants")
    public ResponseEntity<String> updateVariantOptions(@PathVariable Long productId, @RequestBody ProductDTO productDTO){
        this.productDAO.updateProductVariant(productId, productDTO);
        return ResponseEntity.ok("Product variant and options updated ");
    }


}
