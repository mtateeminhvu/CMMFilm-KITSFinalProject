package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.GenreEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.response.GenreResponse;
import kits.edu.final_project.repository.GenreRepository;
import kits.edu.final_project.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GenreServiceImp implements GenreService {
    @Autowired
    GenreRepository genreRepository;
    public List<GenreResponse> getGenres() {
        List<Map<String, Object>> genreList = genreRepository.getGenre();
//        System.out.println(genreList.toString());
        GenreResponse genreResponse = new GenreResponse();
        List<GenreResponse> genreResponseList = new ArrayList<>();
        for (Map genreMap: genreList) {
            genreResponseList.add(genreResponse.mapGenreToResponse(genreMap));
        }
        return genreResponseList;
    }

    @Override
    public boolean addGenre(GenreEntity genreEntity) {

            boolean isSuccess =false;
            try {
                GenreEntity genre = new GenreEntity();
                genre.setId(genreEntity.getId());
                genre.setDesc(genreEntity.getDesc());
                genre.setName(genreEntity.getName());
                genre.setStatus(genreEntity.getStatus());

                genreRepository.save(genre);
                isSuccess=true;
            }catch (Exception e)
            {
                throw new CustomException("Loi them Genre"+e.getMessage());
            }
            return isSuccess;

    }
    @Override
    public GenreEntity replaceGenreById(GenreEntity genreEntity, int id) {
//        System.out.println(id);
        return genreRepository.findById(id).map(u->{
                    u.setName(genreEntity.getName());
                    u.setDesc(genreEntity.getDesc());
                    u.setStatus(genreEntity.getStatus());

                    return genreRepository.save(u);
                })
                .orElseGet(()->{
                    return genreRepository.save(genreEntity);
                });
//        return null;
    }


    public List<GenreEntity> deleteGenreById(int id) {
        genreRepository.deleteById(id);
        return genreRepository.findAll();
    }


    public boolean deleteGenreByIds(int id) {
        boolean isSuccess =false;
        try {

            genreRepository.deleteById(id);
            isSuccess=true;
        }catch (Exception e)
        {

            throw new CustomException("Loi xoa genre "+e.getMessage());
        }
        return isSuccess;
    }

}
