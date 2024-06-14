package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.OrderEntity;
import kits.edu.final_project.entity.PackageEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.response.OrderResponse;
import kits.edu.final_project.repository.OrderRepository;
import kits.edu.final_project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<OrderResponse> getOrders() {
        List<OrderEntity> list= orderRepository.findAll();
        List<OrderResponse> responses = new ArrayList<>();
        try {
            for (OrderEntity order:list) {
                OrderResponse orderResponse = new OrderResponse();
                orderResponse.setId(order.getId());
                orderResponse.setUser(order.getUser());
//                orderResponse.setOrderMovies(order.getOrderMovies());
                orderResponse.setPack(order.getPack());
                orderResponse.setDuration(order.getDuration());
                responses.add(orderResponse);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return responses;
    }

    public OrderEntity addOrder( OrderEntity orderEntity) {
        return orderRepository.save(orderEntity);
    }

    public OrderEntity updateOrderById (OrderEntity orderEntity,int id) {
        return orderRepository.findById(id).map( o -> {
            o.setDuration(orderEntity.getDuration());
            o.setPack(orderEntity.getPack());
            o.setUser(orderEntity.getUser());
            return orderRepository.save(o);
        } ).orElseGet(()->{
            return orderRepository.save(orderEntity);
        });
    }
    @Override
    public boolean deleteOrderById (int id) {
//        List<OrderEntity> list = orderRepository.findAll();
        boolean isSuccess=false;
        try {


//            list.remove(orderRepository.findById(id));


            orderRepository.deleteById(id);
            isSuccess=true;
//            return true;
        } catch (Exception e) {
//            return false;
            throw new CustomException("Loi xoa Order"+e.getMessage());
        }

        return isSuccess;
    }

    @Override
    public boolean checkUserPackage(int idUser) {
        List<OrderEntity> orderEntity = orderRepository.findByOrderType(idUser);
        if (orderEntity != null && orderEntity.size() > 0) {
            return orderEntity.get(0).isOrderType();
        }
        return false;
    }

    @Override
    public boolean buyPackage(int idPackage, int idUser) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(idUser);
        PackageEntity packageEntity = new PackageEntity();
        packageEntity.setId(idPackage);
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setPack(packageEntity);
        orderEntity.setUser(userEntity);
        orderEntity.setOrderType(true);
        orderRepository.save(orderEntity);
        return true;
    }
}
