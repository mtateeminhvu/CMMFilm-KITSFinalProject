package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.entity.ReviewEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.response.MovieResponse;
import kits.edu.final_project.payload.response.ReviewResponse;
import kits.edu.final_project.payload.response.UserResponse;
import kits.edu.final_project.repository.MovieRepository;
import kits.edu.final_project.repository.ReviewRepository;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImp implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MovieRepository movieRepository;
    @Override
    public List<ReviewResponse> getAllReviews() {




        List<ReviewEntity> list=reviewRepository.findAll();

//        System.out.println(list);
        List<ReviewResponse> responseList=new ArrayList<>();
        try {

            for(ReviewEntity r:list){
                ReviewResponse reviewResponse=new ReviewResponse();
                reviewResponse.setContent(r.getContent());
                reviewResponse.setId(r.getId());
                reviewResponse.setRating(r.getRating());
                reviewResponse.setStatus(r.getStatus());
                reviewResponse.setUser(r.getUser());
                reviewResponse.setMovieName(r.getMovie().getTitle());
//                MovieResponse movieResponse = new MovieResponse();
//                reviewResponse.setMovieResponse(movieResponse.mapMovieToResponse(r.getMovie()));
                responseList.add(reviewResponse);
            }
        }catch (Exception e)
        {
            throw new CustomException("Loi get Review lists"+e.getMessage());
        }
//        System.out.println(responseList);
        return responseList;
    }

    @Override
    public boolean deleteReviewById(int id) {
        boolean isSuccess =false;
        try {

            reviewRepository.deleteById(id);
            isSuccess=true;
        }catch (Exception e)
        {

            throw new CustomException("Loi xoa review "+e.getMessage());
        }
        return isSuccess;
    }

    @Override
    public boolean replaceReviewById(ReviewRequest reviewRequest, int id) {
        try {
            Optional<ReviewEntity> optionalReview = reviewRepository.findById(id);
            if (optionalReview.isPresent()) {
                ReviewEntity review = optionalReview.get();

                // Thực hiện cập nhật các giá trị mới cho review
                review.setRating(reviewRequest.getRating());
                review.setContent(reviewRequest.getContent());
                review.setStatus(reviewRequest.getStatus());

                // Lưu lại review đã cập nhật vào cơ sở dữ liệu
                reviewRepository.save(review);

                return true; // Trả về true để chỉ ra rằng việc cập nhật thành công
            }
            return false; // Trả về false nếu không tìm thấy review với ID đã cho

        } catch (Exception e) {
            throw new CustomException("Lỗi khi cập nhật review: " + e.getMessage());
        }
    }



    @Override
    public void addReview(int movieId,ReviewRequest reviewRequest, Principal principal) {
        try{
//            System.out.println(principal);
            // Lấy thông tin người dùng đã đăng nhập từ Principal
            String username = String.valueOf(principal.getName());

            // Kiểm tra xem người dùng đã xác thực hay chưa
            if (username == null) {
                throw new CustomException("Bạn phải đăng nhập để thêm review.");
            }
            System.out.println(username);
            // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên username
            UserEntity user = userRepository.findByEmail(username);
            System.out.println(user);
            // Lấy thông tin phim từ cơ sở dữ liệu dựa trên movieId
            MovieEntity movie = movieRepository.findById(movieId)
                    .orElseThrow(() -> new CustomException("Không tìm thấy phim với ID đã cho."));

            ReviewEntity review = new ReviewEntity();
            review.setUser(user);
            review.setMovie(movie);
            review.setRating(reviewRequest.getRating());
            review.setContent(reviewRequest.getContent());
            review.setStatus(reviewRequest.getStatus());


            reviewRepository.save(review);
        }
        catch (Exception e){
            throw new CustomException("Loi them Review"+e.getMessage());
        }

    }

    @Override
    public List<ReviewEntity> getReviewByMovieId(int movieId) {
        return reviewRepository.getReviewByMovieId(movieId);
    }
}
