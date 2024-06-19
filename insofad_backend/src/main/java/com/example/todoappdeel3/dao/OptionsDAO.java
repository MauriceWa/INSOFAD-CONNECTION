package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.models.Options;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class OptionsDAO {

    private final OptionsRepository optionsRepository;

    public OptionsDAO(OptionsRepository optionsRepository) {
        this.optionsRepository = optionsRepository;
    }

    public List<Options> getAllOptions(){
        return this.optionsRepository.findAll();
    }

    public Options getOption(long id){

        Optional<Options> option = this.optionsRepository.findById(id);

            if(option.isPresent()) {
                return option.get();
            }  else {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "De gevraagde option is niet gevonden"
                );
            }

    }




}
