package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.models.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionsRepository extends JpaRepository<Options, Long> {



}
