package kits.edu.final_project.controller;


import com.google.gson.Gson;
import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.payload.response.MovieResponse;
import kits.edu.final_project.service.GenreService;
import kits.edu.final_project.service.MovieService;
import kits.edu.final_project.service.imp.GenreMovieServiceImp;
import kits.edu.final_project.service.imp.MovieServiceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @Autowired
    private GenreMovieServiceImp genreMovieServiceImp;
    @Autowired
    private GenreService genreService;
    @GetMapping("")
    public ResponseEntity<?> getMovieList() {
//        BaseResponse response = new BaseResponse();
//        response.setStatusCode(200);
//        response.setData(movieService.getMovieList());
//        return  new ResponseEntity<>(response, HttpStatus.OK);

            List<MovieResponse> movieEntityList = movieService.getMovieList();
            BaseResponse newBaseResponse = new BaseResponse();
            newBaseResponse.setStatusCode(200);
            newBaseResponse.setData(movieEntityList);
            return new ResponseEntity<>(newBaseResponse, HttpStatus.OK);


    }
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<?> createMovie(@RequestBody MovieResponse objData) {

            MovieEntity movieEntity =  objData.mapMovieToEntity(objData);
            Set<Integer> genreIdList = objData.getGenreId();
            movieService.createMovie(movieEntity);
            genreMovieServiceImp.createGenreMovie(genreIdList, movieEntity.getId());
            BaseResponse newBaseResponse = new BaseResponse();
            newBaseResponse.setData(objData);
            newBaseResponse.setStatusCode(201);
            return new ResponseEntity<>(newBaseResponse, HttpStatus.OK);

    }
//    private Logger logger= LoggerFactory.getLogger(ProductControler.class);
    private Gson gson=new Gson();
    @PostMapping("/{movieId}/reviews")
    public ResponseEntity<?> addReviewForMovie(@PathVariable int movieId, @RequestBody ReviewRequest reviewRequest, Principal principal) {
        // Gọi phương thức của MovieService để thêm review cho phim
        movieService.addReviewForMovie(movieId, reviewRequest, principal);
        BaseResponse newBaseResponse = new BaseResponse();
        newBaseResponse.setData(true);
        newBaseResponse.setStatusCode(201);
        return new  ResponseEntity(newBaseResponse, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovieById (@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(movieService.deleteMovieById(id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovieById (@RequestBody MovieEntity movieEntity, @PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(movieService.replaceMovieById(movieEntity,id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
