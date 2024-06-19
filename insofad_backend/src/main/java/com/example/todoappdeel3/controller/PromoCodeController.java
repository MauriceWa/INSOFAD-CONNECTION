package com.example.todoappdeel3.controller;

import com.example.todoappdeel3.dao.PromoCodeDAO;
import com.example.todoappdeel3.dto.PromoCodeDTO;
import com.example.todoappdeel3.dto.PromoCodeUseDTO;
import com.example.todoappdeel3.models.PromoCode;
import com.example.todoappdeel3.services.PromoCodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/promo-codes")
public class PromoCodeController {
    private final PromoCodeDAO promoCodeDAO;

    private final PromoCodeService promoCodeService;


    public PromoCodeController(PromoCodeDAO promoCodeDAO, PromoCodeService promoCodeService) {
        this.promoCodeDAO = promoCodeDAO;
        this.promoCodeService = promoCodeService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPromoCode(@RequestBody PromoCodeDTO promoCodeDTO) {
        System.out.println("Creating promo code");
        this.promoCodeDAO.createPromoCode(promoCodeDTO);
        return ResponseEntity.ok("Promo code created");
    }

    @PostMapping("/use")
    public ResponseEntity<String> usePromoCode(@RequestBody PromoCodeUseDTO promoCodeUseDTO) {
        this.promoCodeService.usePromoCode(promoCodeUseDTO.code);
        return ResponseEntity.ok("Promo code used");
    }

    @GetMapping("/active")
    public ResponseEntity<List<PromoCode>> getActivePromoCodes() {
        List<PromoCode> promoCodes = this.promoCodeDAO.getAllActivePromoCodes();
        return ResponseEntity.ok(promoCodes);
    }

    @GetMapping("/get/{code}")
    public ResponseEntity<PromoCode> getPromoCode(@PathVariable String code) {
        System.out.println("Getting promo code with code " + code);
        PromoCode promoCode = this.promoCodeDAO.getPromoCode(code);
        return ResponseEntity.ok(promoCode);
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<PromoCode>> getInactivePromoCodes() {
        List<PromoCode> promoCodes = this.promoCodeDAO.getAllInactivePromoCodes();
        return ResponseEntity.ok(promoCodes);
    }
}
