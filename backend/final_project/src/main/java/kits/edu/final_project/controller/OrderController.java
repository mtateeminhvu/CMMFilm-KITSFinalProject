package kits.edu.final_project.controller;

import kits.edu.final_project.entity.OrderEntity;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.payload.response.OrderResponse;
import kits.edu.final_project.service.OrderService;
import kits.edu.final_project.service.UserService;
import kits.edu.final_project.service.imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    UserService userService;

    @GetMapping("")
    public ResponseEntity<?> getOrders() {
        BaseResponse response=new BaseResponse();
        response.setStatusCode(200);
        response.setData(orderService.getOrders());
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping(value = "/add")
    @ResponseBody

    public ResponseEntity<?> addOrder(@RequestBody OrderEntity orderEntity) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(201);
        response.setData(orderService.addOrder(orderEntity));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrderById(@RequestBody OrderEntity orderEntity,@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(orderService.updateOrderById(orderEntity,id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrderById(@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(orderService.deleteOrderById(id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PostMapping("/buyPackage")
    public ResponseEntity<?> buyPackage (@RequestParam("idPackage") int idPackage, Principal principal) {
        int idUser = userService.getUserByname(principal.getName());
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(orderService.buyPackage(idPackage, idUser));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/check-user-package")
    public ResponseEntity<?> checkUserPackage (Principal principal) {
        int idUser = userService.getUserByname(principal.getName());
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(orderService.checkUserPackage(idUser));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
