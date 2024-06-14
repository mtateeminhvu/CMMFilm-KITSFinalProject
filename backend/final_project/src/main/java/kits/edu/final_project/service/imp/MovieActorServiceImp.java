package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.MovieActor;
import kits.edu.final_project.repository.MovieActorRepository;
import kits.edu.final_project.service.MovieActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieActorServiceImp implements MovieActorService {
    @Autowired
    private MovieActorRepository movieActorRepository;
    @Override
    public List<MovieActor> getMovieActor() {
        List<MovieActor> list = movieActorRepository.findAll();
        return list;
//        return null;
    }

    @Override
    public MovieActor addNew(MovieActor movieActor) {
        return movieActorRepository.save(movieActor);
//        return null;
    }
}
