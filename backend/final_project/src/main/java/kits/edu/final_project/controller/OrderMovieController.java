//package kits.edu.final_project.controller;
//
//import kits.edu.final_project.entity.OrderMovie;
//import kits.edu.final_project.payload.response.BaseResponse;
//import kits.edu.final_project.service.imp.OrderMovieServiceImp;
//import kits.edu.final_project.service.imp.OrderServiceImp;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/order-movie")
//@CrossOrigin("*")
//public class OrderMovieController {
//    @Autowired
//    OrderMovieServiceImp orderMovieServiceImp;
//
//    @GetMapping("")
//    public ResponseEntity<?> getOrderMovie() {
//        BaseResponse response=new BaseResponse();
//        response.setStatusCode(200);
//        response.setData(orderMovieServiceImp.getOrderMovie());
//        return  new ResponseEntity<>(response, HttpStatus.OK);
//    }
////    @PostMapping("/add")
////    @ResponseBody
////    public ResponseEntity<?> addOrderMovie(@RequestBody OrderMovie orderMovie) {
////        BaseResponse response=new BaseResponse();
////        response.setStatusCode(200);
////        response.setData(orderMovieServiceImp.addOrderMovie(orderMovie));
////        return new ResponseEntity<>(response, HttpStatus.OK);
////    }
//}
