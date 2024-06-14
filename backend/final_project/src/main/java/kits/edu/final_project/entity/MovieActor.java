package kits.edu.final_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kits.edu.final_project.entity.ids.GenreMovieIds;
import kits.edu.final_project.entity.ids.MovieActorIds;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "movie_actor")
public class MovieActor {

    @EmbeddedId
    private MovieActorIds ids;

    @ManyToOne
    @JoinColumn(name = "actor_id", insertable = false,updatable = false)
    private ActorEntity actor;

    @ManyToOne
    @JoinColumn(name = "movie_id", insertable = false,updatable = false)
    private MovieEntity movie;

    public MovieActorIds getIds() {
        return ids;
    }

    public void setIds(MovieActorIds ids) {
        this.ids = ids;
    }

    public ActorEntity getActor() {
        return actor;
    }

    @JsonIgnore

    public void setActor(ActorEntity actor) {
        this.actor = actor;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    @JsonIgnore
    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}