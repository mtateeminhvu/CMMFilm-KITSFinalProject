package kits.edu.final_project.repository;

import kits.edu.final_project.entity.MovieEntity;
import kits.edu.final_project.payload.response.MovieResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Integer> {
//    @Query(value = "SELECT " +
//            "m.movie_id,bg_color, m.description,duration, language , \n" +
//            "item_color,price,release_date,title, g.name as genre\n" +
//            "FROM m_movies.movies m\n" +
//            "JOIN m_movies.genre_movie gm ON  m.movie_id = gm.movie_id\n" +
//            "JOIN  m_movies.genre g ON gm.genre_id = g.genre_id", nativeQuery = true)
    @Query(value = "SELECT movie_id,bg_color, description,duration, language, " +
            "item_color, price, release_date, title " +
            "FROM movies OrderBy release_date Desc", nativeQuery = true)
    public List<Map<String, Object>> getMovies();

    @Query(value = "SELECT * FROM movies limit :limit OrderBy release_date DESC", nativeQuery = true)
    public List<MovieEntity> getMoviesLimit(int limit);

    @Query(value = "SELECT * FROM movies WHERE title like %name% OrderBy release_date DESC", nativeQuery = true)
    public List<MovieEntity> getMoviesByNameAndPriceAndActor(String name);
    @Query(value = "SELECT * FROM movies WHERE price >= :price  OrderBy price ASC, release_date DESC", nativeQuery = true)
    public List<MovieEntity> getMoviesByNameAndPriceAndActor(int price);
//    @Query(value = "SELECT * FROM movies WHERE ?", )
//    public List<MovieEntity> getMoviesByNameAndPriceAndActor(String name, int price, String actor);

}
