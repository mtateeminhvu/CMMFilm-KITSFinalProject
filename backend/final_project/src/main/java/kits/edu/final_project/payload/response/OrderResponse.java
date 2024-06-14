package kits.edu.final_project.payload.response;

//import kits.edu.final_project.entity.OrderMovie;
import kits.edu.final_project.entity.PackageEntity;
import kits.edu.final_project.entity.UserEntity;

import java.util.Set;

public class OrderResponse {
    private int id;
    private int duration;
    private boolean orderType;
//    private Set<OrderMovie> orderMovies;
    private PackageEntity pack;
    private UserEntity user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean isOrderType() {
        return orderType;
    }

    public void setOrderType(boolean orderType) {
        this.orderType = orderType;
    }

//    public Set<OrderMovie> getOrderMovies() {
//        return orderMovies;
//    }
//
//    public void setOrderMovies(Set<OrderMovie> orderMovies) {
//        this.orderMovies = orderMovies;
//    }

    public PackageEntity getPack() {
        return pack;
    }

    public void setPack(PackageEntity pack) {
        this.pack = pack;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
