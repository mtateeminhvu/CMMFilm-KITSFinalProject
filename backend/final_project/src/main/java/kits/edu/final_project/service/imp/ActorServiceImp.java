package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.ActorEntity;
import kits.edu.final_project.repository.ActorRepository;
import kits.edu.final_project.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorServiceImp implements ActorService {

    @Autowired
    private ActorRepository actorRepository;

    @Override
    public List<ActorEntity> getActor() {
        List<ActorEntity> list = actorRepository.findAll();
        return list;
    }

    @Override
    public ActorEntity addActor(ActorEntity actorEntity) {
        return actorRepository.save(actorEntity);
    }

    @Override
    public ActorEntity replaceActorById(ActorEntity actorEntity, int id) {
        return actorRepository.findById(id).map(ac -> {
            ac.setCountry(actorEntity.getCountry());
            ac.setName(actorEntity.getName());
            ac.setDob(actorEntity.getDob());
            return actorRepository.save(ac);
        }) .orElseGet(() -> {
            return actorRepository.save(actorEntity);
        });
//        return null;
    }

    @Override
    public List<ActorEntity> deleteActorById(int id) {
        actorRepository.deleteById(id);
        return actorRepository.findAll();
//        return null;
    }
}
