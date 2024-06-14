package kits.edu.final_project.service;


import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.response.MovieResponse;
import kits.edu.final_project.payload.response.ProductResponse;
import kits.edu.final_project.repository.MovieRepository;

import kits.edu.final_project.service.imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public interface MovieService  {
    List<MovieResponse> getMovieList();
    void addReviewForMovie(int movieId, ReviewRequest reviewRequest, Principal principal);

    void createMovie(MovieEntity movieEntity);
    List<MovieEntity> deleteMovieById(@PathVariable int id);
    boolean replaceMovieById(@RequestBody MovieEntity movieEntity, @PathVariable int id);
}
