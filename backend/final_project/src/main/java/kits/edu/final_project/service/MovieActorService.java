package kits.edu.final_project.service;

import kits.edu.final_project.entity.MovieActor;
import kits.edu.final_project.repository.MovieActorRepository;
import kits.edu.final_project.service.imp.MovieActorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MovieActorService  {

    List<MovieActor> getMovieActor();
    MovieActor addNew(MovieActor movieActor);
}
