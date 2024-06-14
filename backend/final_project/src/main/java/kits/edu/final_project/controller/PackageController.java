package kits.edu.final_project.controller;

import kits.edu.final_project.entity.PackageEntity;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.service.OrderService;
import kits.edu.final_project.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/package")
@CrossOrigin("*")
public class PackageController {
    @Autowired
    PackageService packageService;

    @GetMapping("")
    public ResponseEntity<?> getPackage() {
        BaseResponse response=new BaseResponse();
        response.setStatusCode(200);
        response.setData(packageService.getPackage());
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping(value = "/{id}",consumes={"application/json"})
    @ResponseBody
    public ResponseEntity<?> addPackage(@PathVariable("id") int id , @RequestBody PackageEntity packageEntity) {
        BaseResponse response = new BaseResponse();
        response.setStatusCode(201);
        response.setData(packageService.replacePackage(id,packageEntity));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
