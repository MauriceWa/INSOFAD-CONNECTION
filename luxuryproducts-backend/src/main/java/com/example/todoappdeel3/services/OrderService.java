package com.example.todoappdeel3.services;


import com.example.todoappdeel3.dto.OrderDTO;
import com.example.todoappdeel3.models.Order;

import java.util.List;

public interface OrderService {
    Order placeOrder(OrderDTO orderDTO);

    List<Order> findOrdersByCustomUserId(Long userId);
}
