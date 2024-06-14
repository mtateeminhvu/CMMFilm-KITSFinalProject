package kits.edu.final_project.service;


import kits.edu.final_project.entity.ReviewEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.SignupRequest;
import kits.edu.final_project.payload.response.UserResponse;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public interface UserService  {
        boolean addUser(SignupRequest request);
    List<UserResponse> getAllUsers();

    UserEntity replaceUserById(@RequestBody UserEntity userEntity, @PathVariable int id);
    boolean replaceStatusUserById(@RequestBody UserEntity userEntity, @PathVariable int id);
//    @Modifying
//    @Query(value = "delete from users u where u.user_id= :id")
    List<UserEntity> deleteUserById(@PathVariable int id);
//    UserEntity getByUsername(String username)
Optional<UserEntity> getByUsername(String username);
public int getUserByname(String email);
UserResponse getUserByToken(String username);
boolean resetPasswordUser(String passwordNew,String username );
}
