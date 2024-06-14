package kits.edu.final_project.repository;

import kits.edu.final_project.entity.ReviewEntity;
import kits.edu.final_project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity,Integer> {

    @Query(value = "SELECT * FROM review WHERE movie_id = :movieId", nativeQuery = true)
    public List<ReviewEntity> getReviewByMovieId(int movieId);
}
