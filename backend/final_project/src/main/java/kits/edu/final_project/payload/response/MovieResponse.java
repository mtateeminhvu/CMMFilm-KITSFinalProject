package kits.edu.final_project.payload.response;

import kits.edu.final_project.entity.*;

import java.util.*;

public class MovieResponse {
    private int id;
    private String title;
    private String desc;
    private Date releaseDate;
    private int duration;
    private double price;
    private String movieLink;
    private String movieImage;
    private String language;
    private String bgColor;
    private String itemColor;
    private Set<String> genreName;
    private List<String> actorName;
    private Set<Integer> genreId;
//    private Set<ReviewEntity> reviews;
//    private Set<GenreMovie> genreMovies;
//    private Set<MovieActor> movieActors;
//    private Set<OrderMovie> orderMovies;

    public MovieResponse() {
    }
    public MovieResponse(int id, String title, String desc) {
        this.id = id;
        this.title = title;
        this.desc = desc;
    }
    public MovieResponse(int id, String title, String desc, Date releaseDate, int duration, int price, String movieLink, String movieImage, String language, String bgColor, String itemColor) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.releaseDate = releaseDate;
        this.duration = duration;
        this.price = price;
        this.movieLink = movieLink;
        this.movieImage = movieImage;
        this.language = language;
        this.bgColor = bgColor;
        this.itemColor = itemColor;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMovieLink() {
        return movieLink;
    }

    public void setMovieLink(String movieLink) {
        this.movieLink = movieLink;
    }

    public String getMovieImage() {
        return movieImage;
    }

    public void setMovieImage(String movieImage) {
        this.movieImage = movieImage;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public String getItemColor() {
        return itemColor;
    }

    public void setItemColor(String itemColor) {
        this.itemColor = itemColor;
    }

    public Set<String> getGenreName() {
        return genreName;
    }

    public void setGenreName(Set<String> genreName) {
        this.genreName = genreName;
    }

    public List<String> getActorName() {
        return actorName;
    }

    public void setActorName(List<String> actorName) {
        this.actorName = actorName;
    }

    public Set<Integer> getGenreId() {
        return genreId;
    }

    public void setGenreId(Set<Integer> genreId) {
        this.genreId = genreId;
    }

    public MovieResponse mapMovieToResponse(MovieEntity movieEntities){
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setId(movieEntities.getId());
        movieResponse.setTitle(movieEntities.getTitle());
        movieResponse.setDuration(movieEntities.getDuration());
        movieResponse.setMovieLink(movieEntities.getMovieLink());
        movieResponse.setDesc(movieEntities.getDesc());
        movieResponse.setReleaseDate(movieEntities.getReleaseDate());
        movieResponse.setPrice(movieEntities.getPrice());
        movieResponse.setMovieImage(movieEntities.getMovieImage());
        Set<String> genreSet = new HashSet<>();
        for (GenreMovie gMovie: movieEntities.getGenreMovies()) {
            genreSet.add(gMovie.getGenre().getName());
        }
        movieResponse.setGenreName(genreSet);

        List<String> actorList = new ArrayList<>();
        for (MovieActor mActor: movieEntities.getMovieActors()) {
            actorList.add(mActor.getActor().getName());
        }
        movieResponse.setActorName(actorList);
        return movieResponse;
    }

    public List<MovieResponse> mapMovieToResponse(List<Map<String, Object>> objMaps){
        List<MovieResponse> movieResponseList = new ArrayList<>();

        for (Map object : objMaps) {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId((int) object.get("movie_id"));
            movieResponse.setTitle((String) object.get("title"));
            movieResponse.setDuration((int) object.get("duration"));
            movieResponse.setMovieLink((String) object.get("movie_link"));
            movieResponse.setMovieImage((String) object.get("movie_image"));
//            Set<String> genreSet = new HashSet<>();
//            for (GenreMovie gMovie: movieEntities.getGenreMovies()) {
//                genreSet.add(gMovie.getGenre().getName());
//            }
//            movieResponse.setGenreName(genreSet);
            movieResponseList.add(movieResponse);
        }

        return movieResponseList;
    }

    public MovieEntity mapMovieToEntity(MovieResponse movieResponse){
        MovieEntity movieEntity = new MovieEntity();
        movieEntity.setId(movieResponse.getId());
        movieEntity.setTitle(movieResponse.getTitle());
        movieEntity.setDuration(movieResponse.getDuration());
        movieEntity.setMovieLink(movieResponse.getMovieLink());
        movieEntity.setMovieImage(movieResponse.getMovieImage());
        movieEntity.setReleaseDate(movieResponse.getReleaseDate());
        movieEntity.setDesc(movieResponse.getDesc());
        movieEntity.setPrice(movieResponse.getPrice());
        return movieEntity;
    }
}
