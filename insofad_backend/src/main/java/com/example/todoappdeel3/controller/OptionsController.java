package com.example.todoappdeel3.controller;

import com.example.todoappdeel3.dao.OptionsDAO;
import com.example.todoappdeel3.models.Options;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/options")
public class OptionsController {

    private OptionsDAO optionsDAO;

    public OptionsController(OptionsDAO optionsDAO) {
        this.optionsDAO = optionsDAO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Options> getOption(@PathVariable Long id){
        try {
            Options option = this.optionsDAO.getOption(id);
            return ResponseEntity.ok(option);
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    }





