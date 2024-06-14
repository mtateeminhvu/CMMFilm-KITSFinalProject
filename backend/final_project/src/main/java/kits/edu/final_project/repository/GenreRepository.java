package kits.edu.final_project.repository;

import kits.edu.final_project.entity.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GenreRepository extends JpaRepository<GenreEntity, Integer> {
    @Query( value = "SELECT g.genre_id, name, description,status, count(gm.genre_id) as countMovies " +
            "FROM genre g " +
            "LEFT JOIN genre_movie gm ON gm.genre_id = g.genre_id " +
            "Group by g.genre_id", nativeQuery = true)
    public List<Map<String, Object>> getGenre();
}
