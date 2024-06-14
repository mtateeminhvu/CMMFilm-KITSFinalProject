package kits.edu.final_project.controller;

import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.SignupRequest;
import kits.edu.final_project.payload.response.BaseResponse;
import kits.edu.final_project.payload.response.UserResponse;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.UserService;
import kits.edu.final_project.service.imp.UserServiceImp;
import kits.edu.final_project.utils.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
public class LoginControlller {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtHelper jwtHelper;
    /*
    * statusCode: 200
    * message:""
    * data:*/
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/signin",method= RequestMethod.POST)
    public ResponseEntity<?>signin(
            @RequestParam String username,
            @RequestParam String password

    ){

        UserEntity user=userRepository.findByEmail(username);
        if(user==null){
            BaseResponse response =new BaseResponse();
            response.setStatusCode(200);
            response.setMessage("Your username not found!");
            response.setData(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        if(user.getStatus() == 1){

            System.out.println(username + password);
            UsernamePasswordAuthenticationToken token=
                    new UsernamePasswordAuthenticationToken(username,password);
            authenticationManager.authenticate(token);
            String jwt= jwtHelper.generateToken(username);
            //chung thuc thanh cong se chay code sau,that bai se loi chugn thuc
            BaseResponse response =new BaseResponse();
            response.setStatusCode(200);
            response.setData(jwt);
            return new ResponseEntity<>(response, HttpStatus.OK);

        }
        else{
//            throw new CustomException("your Account is block");
            BaseResponse response =new BaseResponse();
            response.setStatusCode(200);
            response.setMessage("Your account is block");
            response.setData(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }


    }


    @RequestMapping(value = "/signup",method= RequestMethod.POST)
    public ResponseEntity<?>signup(
            @Valid SignupRequest request,
            BindingResult bindingResult
            ){
        List<FieldError> list = bindingResult.getFieldErrors();
        for (FieldError data:
             list) {
            throw new CustomException(data.getDefaultMessage());
//            System.out.println("kiem tra "+data.getField()+ " - "+data.getDefaultMessage());
        }
        boolean isSuccess = userService.addUser(request);

        BaseResponse response =new BaseResponse();
        response.setStatusCode(200);
        response.setData(isSuccess);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
