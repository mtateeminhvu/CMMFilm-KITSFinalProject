//package kits.edu.final_project.controller;
//
//import com.google.gson.Gson;
//
//import kits.edu.final_project.payload.response.BaseResponse;
//import kits.edu.final_project.service.imp.MovieServiceImp;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/product")
//public class ProductControler {
//    @Autowired
//    private MovieServiceImp productServiceImp;
//
//    private Logger logger= LoggerFactory.getLogger(ProductControler.class);
//    private Gson gson=new Gson();
//    @GetMapping("/category/{id}")
//    public ResponseEntity<?> getProductByCategory(@PathVariable int id){
//        logger.info("Tham so" +id);
//        BaseResponse response=new BaseResponse();
//        response.setStatusCode(200);
//        response.setData(productServiceImp.getProductByCategory(id));
//        logger.info(gson.toJson(response));
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//}
