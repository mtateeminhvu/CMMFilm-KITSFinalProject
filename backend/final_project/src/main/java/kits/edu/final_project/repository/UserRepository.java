package kits.edu.final_project.repository;


import io.lettuce.core.dynamic.annotation.Param;
import kits.edu.final_project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {
//    @Query("from users where email=?1")
//    List<UserEntity> getUserByEmail(String email);
//    UserEntity findByEmail(String email);
@Query("SELECT u FROM users u WHERE u.email = :email")
Optional<UserEntity> findOptionalByEmail(@Param("email") String email);
    @Query("SELECT u FROM users u WHERE u.email = :email")
    UserEntity findByEmail(@Param("email") String email);
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);


       Boolean existsByEmail(String email);


}
