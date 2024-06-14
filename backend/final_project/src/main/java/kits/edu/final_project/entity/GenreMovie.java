package kits.edu.final_project.entity;

import kits.edu.final_project.entity.ids.GenreMovieIds;

import javax.persistence.*;

@Entity(name = "genre_movie")
public class GenreMovie {

    @EmbeddedId
    private GenreMovieIds ids;

    @ManyToOne
    @JoinColumn(name = "genre_id", insertable = false,updatable = false)
    private GenreEntity genre;

    @ManyToOne
    @JoinColumn(name = "movie_id", insertable = false,updatable = false)
    private MovieEntity movie;

    public GenreMovieIds getIds() {
        return ids;
    }

    public void setIds(GenreMovieIds ids) {
        this.ids = ids;
    }

    public GenreEntity getGenre() {
        return genre;
    }

    public void setGenre(GenreEntity genre) {
        this.genre = genre;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}