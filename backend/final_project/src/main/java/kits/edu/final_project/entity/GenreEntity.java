package kits.edu.final_project.entity;


import javax.persistence.*;
import java.util.Set;

@Entity(name = "genre")
public class GenreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int id;

    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String desc;
    @Column(name = "status")
    private int status;
    @OneToMany(mappedBy = "genre")
    private Set<GenreMovie> genreMovies;

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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Set<GenreMovie> getGenreMovies() {
        return genreMovies;
    }

    public void setGenreMovies(Set<GenreMovie> genreMovies) {
        this.genreMovies = genreMovies;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
