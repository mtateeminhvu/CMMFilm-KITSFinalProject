package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.GenreMovie;
import kits.edu.final_project.entity.ids.GenreMovieIds;
import kits.edu.final_project.repository.GenreMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class GenreMovieServiceImp {
    @Autowired
    GenreMovieRepository genreMovieRepository;
    @Transactional
    public void createGenreMovie(Set<Integer> strList, int movieId) {
        List<GenreMovie> genreMovieList = new ArrayList<>();
        for (Integer i : strList) {
            GenreMovieIds genreMovieIds = new GenreMovieIds();
            genreMovieIds.setGenreId(i);
            genreMovieIds.setMovieId(movieId);
            GenreMovie newGenreMovie = new GenreMovie();
            newGenreMovie.setIds(genreMovieIds);
            genreMovieList.add(newGenreMovie);
        }
        genreMovieRepository.saveAll(genreMovieList);
    }
}
