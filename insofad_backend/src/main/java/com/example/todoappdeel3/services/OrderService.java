package com.example.todoappdeel3.services;

import com.example.todoappdeel3.dao.UserDAO;
import com.example.todoappdeel3.models.CustomUser;
import com.example.todoappdeel3.models.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final UserDAO userDAO;

    public OrderService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<Order> findOrderUser(long userId) {
        CustomUser user = userDAO.getUser(userId);

        if (user.getOrders() == null) {
            return new ArrayList<>();
        } else {

            return new ArrayList<>(user.getOrders());
        }
    }
}
