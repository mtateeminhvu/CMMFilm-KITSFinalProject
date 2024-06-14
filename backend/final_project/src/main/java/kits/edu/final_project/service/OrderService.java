package kits.edu.final_project.service;

import kits.edu.final_project.entity.OrderEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.response.OrderResponse;
import kits.edu.final_project.repository.OrderRepository;
import kits.edu.final_project.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

public interface OrderService  {

    List<OrderResponse> getOrders();
    OrderEntity addOrder( OrderEntity orderEntity);
    OrderEntity updateOrderById(OrderEntity orderEntity,int id);
    boolean deleteOrderById(@PathVariable int id);
    boolean buyPackage(int idPackage, int idUser);
    boolean checkUserPackage(int idUser);
}
