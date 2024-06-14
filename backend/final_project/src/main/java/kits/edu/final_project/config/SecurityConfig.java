package kits.edu.final_project.config;


import kits.edu.final_project.filter.JwtFilter;
import kits.edu.final_project.provider.CustomAuthProvider;
import kits.edu.final_project.service.userDetails.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JWTEntryPoint jwtEntryPoint;
//    @Autowired
//    private CustomUserDetailsService customUserDetailsService;



    //khai bao chuan ma hoa Bcrypt va luu tren IOC
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Autowired
    private  CustomAuthProvider customAuthProvider;



    @Autowired
    private JwtFilter jwtFilter;

//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception{
//        return
//                httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
//               //khai bao custom details service
////                .userDetailsService(customUserDetailService)
////                //khai bao chuan ma hoa pass
////                .passwordEncoder(passwordEncoder())
//                        .authenticationProvider(customAuthProvider)
////                .and()
//                .build();
//    }
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        return http.csrf().disable() //tat cau hinh tan cong csrf
//                .exceptionHandling()
//                .authenticationEntryPoint(jwtEntryPoint)
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()//quy dinh rule xac thuc nguoi dung
//                    .antMatchers("/signin","/signup","/demo/**","/movies/**","/review/**").permitAll()//java 11 la antMatcher,17 la requestAntmatcher
//                .antMatchers("/user","/user/**").hasRole("ADMIN")
////                    .anyRequest().authenticated()//cac route con lai bi chan
//                .and()
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//                .build();
//    }

    // Các phần cấu hình khác không thay đổi
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // Add the allowed origin here
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().configurationSource(corsConfigurationSource()) // enable CORS support
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()

                .antMatchers("/signin","/signup", "/movies/**", "/genres/**", "/review/**","/user/**","/order/**","/package/**").permitAll()

                .antMatchers("/dashboard").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/**").hasAuthority("ADMIN")
                .anyRequest().authenticated();
//                    .antMatchers("/**").hasAuthority("ADMIN")
//                .and()
//                .formLogin()
//                .loginPage("/login") // Customize the login page URL
//                .defaultSuccessUrl("/dashboard") // Redirect to the dashboard on successful login
//                .and()
//                .logout().logoutSuccessUrl("/login"); // Redirect to the login page after logout
    }

    //@Bean
//    public AuthenticationProvider authenticationProvider(){
//    DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
//    authenticationProvider.setUserDetailsService(customUserDetailsService);
//    authenticationProvider.setPasswordEncoder(passwordEncoder());
//    return authenticationProvider;
//}
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Xác định customAuthProvider là authenticationProvider cho AuthenticationManagerBuilder
//        auth.userDetailsService(customUserDetailsService);
        auth.authenticationProvider(customAuthProvider);
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}