package kits.edu.final_project.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "actor")
public class ActorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "actor_id")
    private int id;

    @Column(name = "name")
    private String name;
    @Column(name = "actor_country")
    private String country;
    @Column(name = "date_of_birth")
    private Date dob;
    @OneToMany(mappedBy = "actor")
    private Set<MovieActor> movieActors;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Set<MovieActor> getMovieActors() {
        return movieActors;
    }

    public void setMovieActors(Set<MovieActor> movieActors) {
        this.movieActors = movieActors;
    }
}
