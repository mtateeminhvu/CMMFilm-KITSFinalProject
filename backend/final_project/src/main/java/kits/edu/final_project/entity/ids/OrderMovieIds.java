package kits.edu.final_project.entity.ids;

import javax.persistence.*;

import java.io.Serializable;

@Embeddable
public class OrderMovieIds implements Serializable {

    @Column(name = "order_id")
    private int orderId;

    @Column(name = "movie_id")
    private int movieId;

    public OrderMovieIds() {
    }

    public OrderMovieIds(int orderId, int movieId) {
        this.orderId = orderId;
        this.movieId = movieId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
