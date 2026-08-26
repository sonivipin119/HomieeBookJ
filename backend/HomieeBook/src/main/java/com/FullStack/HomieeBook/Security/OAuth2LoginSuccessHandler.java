package com.FullStack.HomieeBook.Security;

import com.FullStack.HomieeBook.Model.UserDetail;
import com.FullStack.HomieeBook.Model.UserRole;
import com.FullStack.HomieeBook.Repository.UserDetailsRepo;
import com.nimbusds.oauth2.sdk.Role;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserDetailsRepo userDetailsRepo;
    private final JwtService jwtService;
    public OAuth2LoginSuccessHandler(UserDetailsRepo userDetailsRepo, JwtService jwtService) {
        this.userDetailsRepo = userDetailsRepo;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        System.out.println("GOOGLE ATTRIBUTES:");
//        System.out.println(oAuth2User.getAttributes()); // give all value return bu google
        String email =  oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
//        String userName = email.substring(0, email.indexOf("@"));
        System.out.println("Google email: " + email);
        System.out.println("Google first name: " + firstName);
        System.out.println("Google last name: " + lastName);

        UserDetail userDetail = userDetailsRepo.findByEmail(email).
                orElseGet(() ->{
                    UserDetail user = new UserDetail();
                    user.setEmail(email);
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setRole(UserRole.USER);
                    user.setUserName(email);
                    return userDetailsRepo.save(user);
                });
        String token = jwtService.generateToken(
                userDetail.getId(),
                userDetail.getEmail(),
                userDetail.getRole().name()
        );

        response.sendRedirect(
                "http://localhost:5173/oauth-success?token=" + token
        );
    }

}
