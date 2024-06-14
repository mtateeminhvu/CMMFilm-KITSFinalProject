package kits.edu.final_project.repository;

import kits.edu.final_project.entity.GenreMovie;
import kits.edu.final_project.entity.ids.GenreMovieIds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreMovieRepository extends JpaRepository<GenreMovie, GenreMovieIds> {

}
