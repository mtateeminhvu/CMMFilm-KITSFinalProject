package kits.edu.final_project.service;

import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.entity.ReviewEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.response.ReviewResponse;
import kits.edu.final_project.repository.MovieRepository;
import kits.edu.final_project.repository.ReviewRepository;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.imp.ReviewServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public interface ReviewService  {
        List<ReviewResponse> getAllReviews();
    boolean deleteReviewById(@PathVariable int id);
//    void addReview(ReviewRequest reviewRequest);
    boolean replaceReviewById(@RequestBody ReviewRequest reviewRequest, @PathVariable int id);
    void addReview(int movieId,ReviewRequest reviewRequest, Principal principal);
    List<ReviewEntity> getReviewByMovieId(int movieId);
}
