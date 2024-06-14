package kits.edu.final_project.controller;

import kits.edu.final_project.entity.ActorEntity;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.service.ActorService;
import kits.edu.final_project.service.imp.ActorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/actor")
@CrossOrigin("*")
public class ActorController {
    @Autowired
    private ActorService actorService;

    @GetMapping("")
    public ResponseEntity<?> getActor() {
        BaseResponse response=new BaseResponse();
        response.setStatusCode(200);
        response.setData(actorService.getActor());
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addActor(@RequestBody ActorEntity actorEntity) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(201);
        response.setData(actorService.addActor(actorEntity));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> replaceActorById(@RequestBody ActorEntity actorEntity,@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(actorService.replaceActorById(actorEntity,id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteActorById(@PathVariable("id") int id) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(200);
        response.setData(actorService.deleteActorById(id));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
