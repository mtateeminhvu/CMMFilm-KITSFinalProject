package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.RoleEntity;
import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.exception.CustomException;
import kits.edu.final_project.payload.request.ReviewRequest;
import kits.edu.final_project.payload.request.SignupRequest;
import kits.edu.final_project.payload.response.UserResponse;
import kits.edu.final_project.repository.RoleRespository;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRespository roleRespository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean addUser(SignupRequest request) {
        boolean isSuccess =false;
        System.out.println(request.getEmail());
        System.out.println(request.getUsername());
        System.out.println(request.getPassword());
        try {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new CustomException("Username already exists");
            }

            if (userRepository.existsByEmail(request.getEmail())) {
                throw new CustomException("Email already exists");
            }
            {
                UserEntity user = new UserEntity();
                user.setUsername(request.getUsername());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setEmail(request.getEmail());
                user.setStatus(1);


                RoleEntity role=roleRespository.findByName("USER").get();
//                System.out.println(role);
                user.setRoles(Collections.singletonList(role));
                userRepository.save(user);
                isSuccess = true;
            }
        }catch (Exception e)
        {
            throw new CustomException(e.getMessage());
        }
        return isSuccess;
    }

    @Override
    public List<UserResponse> getAllUsers() {
//        return userRepository.findAll();
        List<UserEntity> list=userRepository.findAll();
        List<UserResponse> responseList=new ArrayList<>();
        try {
//            UserEntity user = new UserEntity();
            for(UserEntity u:list){
                UserResponse userResponse=new UserResponse();
                userResponse.setEmail(u.getEmail());
                userResponse.setId(u.getId());
                userResponse.setUsername(u.getUsername());
                userResponse.setGender(u.getGender());
                userResponse.setBirthday(u.getBirthday());
                userResponse.setStatus(u.getStatus());
                responseList.add(userResponse);
            }
        }catch (Exception e)
        {
            throw new CustomException("Loi get List users"+e.getMessage());
        }
        return responseList;
    }


    @Override
    public UserEntity replaceUserById(UserEntity userEntity, int id) {
        return userRepository.findById(id).map(u->{
                    u.setUsername(userEntity.getUsername());
                    u.setFirstname(userEntity.getFirstname());
                    u.setLastname(userEntity.getLastname());
                    u.setPassword(userEntity.getPassword());
                    u.setImage(userEntity.getImage());
                    u.setEmail(userEntity.getEmail());
                    u.setGender(userEntity.getGender());
                    u.setStatus(userEntity.getStatus());
                    return userRepository.save(u);
                })
                .orElseGet(()->{
                    return userRepository.save(userEntity);
                });
//        return null;
    }

    @Override
    public boolean replaceStatusUserById(UserEntity userEntity, int id) {
        try {
            Optional<UserEntity> optionalUser = userRepository.findById(id);
            if (optionalUser.isPresent()) {
                UserEntity user = optionalUser.get();

                // Thực hiện cập nhật các giá trị mới cho review
                user.setStatus(userEntity.getStatus());


                // Lưu lại review đã cập nhật vào cơ sở dữ liệu
                userRepository.save(user);

                return true; // Trả về true để chỉ ra rằng việc cập nhật thành công
            }
            return false; // Trả về false nếu không tìm thấy review với ID đã cho

        } catch (Exception e) {
            throw new CustomException("Lỗi khi cập nhật status user: " + e.getMessage());
        }
    }

    @Override
    public List<UserEntity> deleteUserById(int id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }

    @Override
    public Optional<UserEntity> getByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    @Override
    public int getUserByname(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        return userEntity.getId();
    }

    @Override
    public UserResponse getUserByToken(String username) {

        UserEntity user = userRepository.findByEmail(username);
        UserResponse userResponse =new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setGender(user.getGender());
        userResponse.setEmail(user.getEmail());
        userResponse.setOrder(user.getOrders());
        userResponse.setImage(user.getImage());
        return userResponse;
    }

    @Override
    public boolean resetPasswordUser(String passwordNew,String username) {
        System.out.println(username);
        System.out.println(passwordNew);
        boolean isSuccess=false;
        try{
            UserEntity user=  userRepository.findByEmail(username);
            user.setPassword(passwordEncoder.encode(passwordNew));
            userRepository.save(user);
            isSuccess=true;
        }
        catch (Exception e){
            throw new CustomException("Loi cap nhat pass"+e);
        }

        return isSuccess;
    }

}
