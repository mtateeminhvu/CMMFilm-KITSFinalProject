//package kits.edu.final_project.service;
//
//import kits.edu.final_project.entity.OrderMovie;
//import kits.edu.final_project.repository.OrderMovieRepository;
//import kits.edu.final_project.service.imp.OrderMovieServiceImp;
//import kits.edu.final_project.service.imp.OrderServiceImp;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestBody;
//
//import java.util.List;
//
//@Service
//public class OrderMovieService implements OrderMovieServiceImp {
//    @Autowired
//    private OrderMovieRepository orderMovieRepository;
//
//    @Override
//    public List<OrderMovie> getOrderMovie() {
//        return orderMovieRepository.findAll();
////        return null;
//    }
//
//    @Override
//    public OrderMovie addOrderMovie(@RequestBody OrderMovie orderMovie) {
//        return orderMovieRepository.save(orderMovie);
//    }
//}
