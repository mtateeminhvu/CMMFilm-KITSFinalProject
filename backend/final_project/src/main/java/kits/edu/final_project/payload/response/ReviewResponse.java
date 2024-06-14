package kits.edu.final_project.payload.response;

import kits.edu.final_project.entity.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ReviewResponse {
    private int id;
    private double rating;
    private String content;
    private int status;
    private UserEntity user;
    private String movieName;
    private  String userName;
    private MovieResponse movieResponse;



    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public MovieResponse getMovieResponse() {
        return movieResponse;
    }

    public void setMovieResponse(MovieResponse movieResponse) {
        this.movieResponse = movieResponse;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getStatus() {
        return status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    public ReviewResponse mapReviewToResponse(ReviewEntity reviewEntities){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setId(reviewEntities.getId());
        reviewResponse.setContent(reviewEntities.getContent());
        reviewResponse.setStatus(reviewEntities.getStatus());
        reviewResponse.setRating(reviewEntities.getRating());
        reviewResponse.setUser(reviewEntities.getUser());
        reviewResponse.setMovieName(reviewEntities.getMovie().getTitle());
        return reviewResponse;
    }

    public ReviewResponse mapReviewToResponseWithUser(ReviewEntity reviewEntities){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setId(reviewEntities.getId());
        reviewResponse.setContent(reviewEntities.getContent());
        reviewResponse.setStatus(reviewEntities.getStatus());
        reviewResponse.setRating(reviewEntities.getRating());
//        reviewResponse.setUser(reviewEntities.getUser());
        reviewResponse.setMovieName(reviewEntities.getMovie().getTitle());
        String userName = reviewEntities.getUser().getUsername();
        reviewResponse.setUserName(userName);
        return reviewResponse;
    }
}
