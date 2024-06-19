package com.example.todoappdeel3.dao;



import com.example.todoappdeel3.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomUser_Id(Long customUserId);
}

