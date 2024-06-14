package kits.edu.final_project.filter;



import io.jsonwebtoken.Claims;

import kits.edu.final_project.service.userDetails.CustomUserDetailsService;
import kits.edu.final_project.utils.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

//tat ca request deu chay vao
@Component
public class JwtFilter extends OncePerRequestFilter {

    /*
    * Nhan duoc token truyen tren header
    * Giai ma token
    * Neu giai ma thanh cong thi hop le
    * Tao chung thuc va cho vao link ng dung request
    * */
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    public JwtFilter() {
        System.out.println("JwtFilter is initialized!");
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
     //Lay gia tri cua header c key la Authorization
        try {
            String header = request.getHeader("Authorization");
            if(header.startsWith("Bearer ")) {
                String token = header.substring(7);
//          System.out.println(token);
                Claims claims = jwtHelper.decodeToken(token);
                String username= jwtHelper.getUsernameByJWT(token);
                UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
//                System.out.println(userDetails);
                if(claims != null){
                    //tao chung thuc cho Security

                    UsernamePasswordAuthenticationToken user =new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());
//                    System.out.println(user);

                    user.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContext context = SecurityContextHolder.getContext();
                    context.setAuthentication(user);
                }
            }
        }catch(Exception e)
        {

        }

       filterChain.doFilter(request,response);
    }
}
