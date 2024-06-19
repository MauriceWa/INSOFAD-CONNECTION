package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.dto.PromoCodeDTO;
import com.example.todoappdeel3.models.PromoCode;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PromoCodeDAO {
    private final PromoCodeRepository promoCodeRepository;

    public PromoCodeDAO(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    public void createPromoCode(PromoCodeDTO promoCodeDTO) {

        Optional<PromoCode> existingPromoCode = Optional.ofNullable(promoCodeRepository.findByCode(promoCodeDTO.code));

        if (existingPromoCode.isPresent()) {
            // If the promo code already exists, update the existing one
            PromoCode promoCode = existingPromoCode.get();
            promoCode.setDiscount(promoCodeDTO.discount);
            promoCode.setExpiryDate(promoCodeDTO.expiryDate);

            System.out.println("Warning: Are you sure you want to override this code?");
        } else {
            // If the promo code does not exist, create a new one
            PromoCode promoCode = new PromoCode(promoCodeDTO.code, promoCodeDTO.discount, promoCodeDTO.expiryDate);
            promoCodeRepository.save(promoCode);
        }
    }

    public PromoCode getPromoCode(String code) {
        return promoCodeRepository.findByCode(code);
    }

    public List<PromoCode> getAllActivePromoCodes() {
        List<PromoCode> promoCodes = promoCodeRepository.findAll();
        promoCodes.removeIf(promoCode -> promoCode.getExpiryDate().isBefore(java.time.LocalDate.now()));
        return promoCodes;
    }

    public List<PromoCode> getAllInactivePromoCodes() {
        List<PromoCode> promoCodes = promoCodeRepository.findAll();
        promoCodes.removeIf(promoCode -> promoCode.getExpiryDate().isAfter(java.time.LocalDate.now()));
        return promoCodes;
    }


}
