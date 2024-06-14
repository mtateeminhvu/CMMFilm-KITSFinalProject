package kits.edu.final_project.repository;

import kits.edu.final_project.entity.MovieActor;
import kits.edu.final_project.entity.ids.MovieActorIds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieActorRepository extends JpaRepository<MovieActor, MovieActorIds> {
}
