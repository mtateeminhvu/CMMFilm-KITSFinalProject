package kits.edu.final_project.controller;

import kits.edu.final_project.entity.GenreEntity;
import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.payload.response.GenreResponse;
import kits.edu.final_project.service.GenreService;
import kits.edu.final_project.service.imp.GenreServiceImp;
import org.apache.catalina.filters.ExpiresFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/genres")
@CrossOrigin("*")
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> getGenres() {

            List<GenreResponse> genreResponseList = genreService.getGenres();
            BaseResponse newBaseResponse = new BaseResponse();
            newBaseResponse.setData(genreResponseList);
        newBaseResponse.setStatusCode(200);
            return new ResponseEntity<>(newBaseResponse, HttpStatus.OK);

    }
    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addGenre(@RequestBody GenreEntity genreEntity) {
        boolean isSuccess= genreService.addGenre(genreEntity);
//        ResponseEntity.status(201).body(userServiceImp.addNewUser(userEntity));
        BaseResponse response = new BaseResponse();
        response.setStatusCode(201);
        response.setData(isSuccess);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> replaceGereById(@RequestBody GenreEntity genreEntity, @PathVariable("id") int id) {

        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(genreService.replaceGenreById(genreEntity,id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGenreById (@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(genreService.deleteGenreById(id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}