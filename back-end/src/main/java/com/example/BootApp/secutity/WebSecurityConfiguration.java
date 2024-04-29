package com.example.BootApp.secutity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.ldap.EmbeddedLdapServerContextSourceFactoryBean;
import org.springframework.security.config.ldap.LdapBindAuthenticationManagerFactory;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfiguration   {
    private final AccountAuthenticationProvider authenticationProvider;
    private final JWTFilter jwtFilter;


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.applyPermitDefaultValues(); // Разрешить запросы с любых источников

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }




    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authenticationProvider);

        http.cors();
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    try {
                        auth
                                .requestMatchers(HttpMethod.POST, "/api/accounts/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/accounts/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/document/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/document/**").permitAll()
                                //.requestMatchers(HttpMethod.GET,"/post/getHeaders").permitAll()
                                .requestMatchers(HttpMethod.GET,"/post/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/post/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/people/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/**").permitAll()
                                //.requestMatchers(HttpMethod.POST,"/login").permitAll()

                               // .requestMatchers("/**").authenticated()
                               // .anyRequest().hasAnyRole("USER","ADMIN")
                                .and()
                              //  .authenticationProvider(authenticationProvider)
                               // .httpBasic(Customizer.withDefaults())
                                .sessionManagement()
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//                                .and()
////                                .formLogin()
////                                .loginProcessingUrl("/login")
////                                .disable()
////                                .logout()
//                                .formLogin()
//                                .disable();


                                //.permitAll();

                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) ;

        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
