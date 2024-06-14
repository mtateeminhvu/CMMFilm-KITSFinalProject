package kits.edu.final_project.service;

import kits.edu.final_project.entity.ActorEntity;
import kits.edu.final_project.repository.ActorRepository;
import kits.edu.final_project.service.imp.ActorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ActorService  {
    List<ActorEntity> getActor();
    ActorEntity addActor(ActorEntity actorEntity);
    ActorEntity replaceActorById(ActorEntity actorEntity,int id);
    List<ActorEntity> deleteActorById(int id);
}
