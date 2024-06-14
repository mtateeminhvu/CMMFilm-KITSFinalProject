package kits.edu.final_project.entity.ids;

import javax.persistence.*;

import java.io.Serializable;

@Embeddable
public class GenreMovieIds implements Serializable {

    @Column(name = "genre_id")
    private int genreId;

    @Column(name = "movie_id")
    private int movieId;

    public GenreMovieIds() {
    }

    public GenreMovieIds(int genreId, int movieId) {
        this.genreId = genreId;
        this.movieId = movieId;
    }

    public int getGenreId() {
        return genreId;
    }

    public void setGenreId(int genreId) {
        this.genreId = genreId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
