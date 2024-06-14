package kits.edu.final_project.payload.response;

import java.math.BigInteger;
import java.util.Map;

public class GenreResponse {
    private int id;
    private String name;
    private String desc;
    private BigInteger countMovies;
    private int status;
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

    public BigInteger getCountMovies() {
        return countMovies;
    }

    public void setCountMovies(BigInteger countMovies) {
        this.countMovies = countMovies;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    //    public GenreResponse mapGenreToResponse(GenreEntity genreEntity) {
//        GenreResponse genreResponse = new GenreResponse();
//        genreResponse.setId(genreEntity.getId());
//        genreResponse.setDesc(genreEntity.getDesc());
//        genreResponse.setName(genreEntity.getName());
////        genreResponse.setCountMovies(genreEntity.countMoive);
//        return genreResponse;
//    }
    public GenreResponse mapGenreToResponse(Map<String, Object> objMap) {
        GenreResponse genreResponse = new GenreResponse();
        genreResponse.setId((int) objMap.get("genre_id"));
        genreResponse.setDesc((String) objMap.get("description"));
        genreResponse.setName((String) objMap.get("name"));
        genreResponse.setCountMovies((BigInteger) objMap.get("countMovies"));
//        System.out.println(objMap.get("status"));
        genreResponse.setStatus((int) objMap.get("status"));
        return genreResponse;
    }
}
