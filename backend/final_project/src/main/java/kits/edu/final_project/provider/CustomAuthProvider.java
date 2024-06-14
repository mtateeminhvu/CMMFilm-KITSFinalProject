package kits.edu.final_project.provider;




import kits.edu.final_project.entity.UserEntity;
import kits.edu.final_project.repository.UserRepository;
import kits.edu.final_project.service.userDetails.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomAuthProvider implements AuthenticationProvider {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;




    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

      //Lay username nguoi dung truyen vao
        String username= authentication.getName();
        //Lay password nguoi dung truyen vao
        String password =authentication.getCredentials().toString();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        System.out.println(userDetails.getAuthorities());
        if (userDetails != null && passwordEncoder.matches(password, userDetails.getPassword())) {
            return new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), userDetails.getAuthorities());
        }

//        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
//
//        // Kiểm tra xem vai trò "ADMIN" có trong danh sách vai trò hay không
//        boolean isAdmin = authorities.stream()
//                .anyMatch(authority -> authority.getAuthority().equals("ADMIN"));
//
//        // Kiểm tra xem vai trò "USER" có trong danh sách vai trò hay không
//        boolean isUser = authorities.stream()
//                .anyMatch(authority -> authority.getAuthority().equals("USER"));
//
//        // Trả về UsernamePasswordAuthenticationToken với danh sách vai trò tương ứng
//        if (isAdmin) {
//
//            return new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), List.of(new SimpleGrantedAuthority("ADMIN")));
//        } else if (isUser) {
//            return new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
//        }
//
        return null;


//       UserEntity user= userRepository.findByEmail(username);
//      if(user !=null&&passwordEncoder.matches(password,user.getPassword()))
//      {
//        return new UsernamePasswordAuthenticationToken(username,user.getPassword(),new ArrayList<>());
//      }
//        return null;
    }

//    @Override
//    public boolean supports(Class<?> authentication) {
//            //khai bao loai chung thuc su dung de so sanh
//        return authentication.equals(UsernamePasswordAuthenticationToken.class);
//    }
@Override
public boolean supports(Class<?> authentication) {
    // Kiểm tra nếu authentication là instance của UsernamePasswordAuthenticationToken
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
}



}
