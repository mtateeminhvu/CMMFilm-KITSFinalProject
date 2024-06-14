package kits.edu.final_project.entity.ids;

import javax.persistence.*;

import java.io.Serializable;

@Embeddable
public class MovieActorIds implements Serializable {

    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "actor_id")
    private int actorId;

    public MovieActorIds(){}

    public MovieActorIds(int movieId, int actorId) {
        this.movieId = movieId;
        this.actorId = actorId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getActorId() {
        return actorId;
    }

    public void setActorId(int actorId) {
        this.actorId = actorId;
    }
}
