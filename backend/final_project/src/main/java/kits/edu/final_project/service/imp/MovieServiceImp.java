package kits.edu.final_project.service.imp;


import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.response.MovieResponse;
import kits.edu.final_project.repository.MovieRepository;
import kits.edu.final_project.service.MovieService;
import kits.edu.final_project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
@Service
public class MovieServiceImp implements MovieService {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private MovieRepository movieRepository;
    @Override
    public List<MovieResponse> getMovieList() {
        // TODO Auto-generated method stub

        List<MovieEntity> list=movieRepository.findAll();
        MovieResponse movieResponse = new MovieResponse();
        List<MovieResponse> responseList=new ArrayList<>();
        try {
            for (MovieEntity movie : list) {
                responseList.add(movieResponse.mapMovieToResponse(movie));
            }
//            for (MovieEntity m : list) {
//
//                MovieResponse movieResponse = new MovieResponse();
//                movieResponse.setId(m.getId());
//                movieResponse.setTitle(m.getTitle());
//                movieResponse.setDesc(m.getDesc());
//                movieResponse.setDuration(m.getDuration());
//                movieResponse.setReleaseDate(m.getReleaseDate());
//                movieResponse.setPrice(m.getPrice());
//                responseList.add(movieResponse);
//            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return responseList;

    }

    @Override
    public void addReviewForMovie(int movieId, ReviewRequest reviewRequest, Principal principal) {

        // Kiểm tra xem người dùng đã xác thực hay chưa
        System.out.println("dsadsa"+principal);
        if (principal == null) {
            // Người dùng chưa xác thực, không thêm review
            throw new CustomException("Bạn phải đăng nhập để thêm review.");
        }

        // Lấy thông tin người dùng đã đăng nhập từ Principal
        String username = principal.getName();

        // Thực hiện các kiểm tra và xử lý liên quan đến phim (nếu cần)

        // Gọi phương thức của ReviewService để thêm review
        reviewService.addReview(movieId,reviewRequest,principal);
    }

    @Override
    public void createMovie(MovieEntity movieEntity) {
        movieRepository.save(movieEntity);
    }
    @Override
    public List<MovieEntity> deleteMovieById(int id) {
        try {
            movieRepository.deleteById(id);
            return movieRepository.findAll();
        }


       catch (Exception e)
       {
           throw new CustomException("No permit delete");
       }
    }
    @Override
    public boolean replaceMovieById(MovieEntity movieEntity, int id) {
        return movieRepository.findById(id).map(u->{
                    u.setTitle(movieEntity.getTitle());
                    u.setGenreMovies(movieEntity.getGenreMovies());
                    u.setReleaseDate(movieEntity.getReleaseDate());
                    u.setDuration(movieEntity.getDuration());
                    u.setDesc(movieEntity.getDesc());
                    movieRepository.save(u);
                    return true;
                })
                .orElseGet(()->{
                    movieRepository.save(movieEntity);
                    return true;
                });
    }

}
