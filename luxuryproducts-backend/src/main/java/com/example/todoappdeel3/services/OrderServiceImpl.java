package com.example.todoappdeel3.services;


import com.example.todoappdeel3.dao.OrderRepository;
import com.example.todoappdeel3.dto.OrderDTO;
import com.example.todoappdeel3.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order placeOrder(OrderDTO orderDTO) {
        Order order = new Order();
        return orderRepository.save(order);
    }

    public List<Order> findOrdersByCustomUserId(Long userId) {
        return orderRepository.findByCustomUser_Id(userId);
    }
}
