package kits.edu.final_project.controller;

import kits.edu.final_project.entity.MovieActor;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.service.MovieActorService;
import kits.edu.final_project.service.imp.MovieActorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movie-actor")
@CrossOrigin("*")
public class MovieActorController {
    @Autowired
    MovieActorService movieActorService;
    @GetMapping("")
    public ResponseEntity<?> getMovieActor() {
        BaseResponse response=new BaseResponse();
        response.setStatusCode(200);
        response.setData(movieActorService.getMovieActor());
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addNew(@RequestBody MovieActor movieActor) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(201);
        response.setData(movieActorService.addNew(movieActor));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
