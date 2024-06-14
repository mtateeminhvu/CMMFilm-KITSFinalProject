//package kits.edu.final_project.entity;
//
//import kits.edu.final_project.entity.ids.GenreMovieIds;
//import kits.edu.final_project.entity.ids.OrderMovieIds;
//
//import javax.persistence.EmbeddedId;
//import javax.persistence.Entity;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//@Entity(name = "order_movie")
//public class OrderMovie {
//
//    @EmbeddedId
//    private OrderMovieIds ids;
//
//    @ManyToOne
//    @JoinColumn(name = "order_id", insertable = false,updatable = false)
//    private OrderEntity order;
//
//    @ManyToOne
//    @JoinColumn(name = "movie_id", insertable = false,updatable = false)
//    private MovieEntity movie;
//
//    public OrderMovieIds getIds() {
//        return ids;
//    }
//
//    public void setIds(OrderMovieIds ids) {
//        this.ids = ids;
//    }
//
//    public OrderEntity getOrder() {
//        return order;
//    }
//
//    public void setOrder(OrderEntity order) {
//        this.order = order;
//    }
//
//    public MovieEntity getMovie() {
//        return movie;
//    }
//
//    public void setMovie(MovieEntity movie) {
//        this.movie = movie;
//    }
//}
