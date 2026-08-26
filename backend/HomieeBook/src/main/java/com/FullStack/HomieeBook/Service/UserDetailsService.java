package com.FullStack.HomieeBook.Service;

import com.FullStack.HomieeBook.Dto.propertyDto.PropertyListResponseDto;
import com.FullStack.HomieeBook.Dto.userDto.LoginRequestDto;
import com.FullStack.HomieeBook.Dto.userDto.LoginResponseDto;
import com.FullStack.HomieeBook.Dto.userDto.UserDetailRequestDto;
import com.FullStack.HomieeBook.Mapper.PropertyMapper;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.UserDetail;
import com.FullStack.HomieeBook.Repository.PropertyRepo;
import com.FullStack.HomieeBook.Repository.UserDetailsRepo;
import com.FullStack.HomieeBook.Security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsService {

    private final UserDetailsRepo userDetailsRepo;
    private final PropertyRepo propertyRepo;
    private final PropertyMapper propertyMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserDetailsService(UserDetailsRepo userDetailsRepo, PropertyRepo propertyRepo
            , PropertyMapper propertyMapper, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userDetailsRepo = userDetailsRepo;
        this.propertyRepo = propertyRepo;
        this.propertyMapper = propertyMapper;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDetail SignUp(UserDetailRequestDto userDetailDto){
        String encodedPassword = passwordEncoder.encode(userDetailDto.getPassword());
        UserDetail userDetail = new UserDetail();
        userDetail.setFirstName(userDetailDto.getFirstName());
        userDetail.setLastName(userDetailDto.getLastName());
        userDetail.setUserName(userDetailDto.getUserName());
        userDetail.setPassword(encodedPassword);
        userDetail.setEmail(userDetailDto.getEmail());
        userDetail.setRole(userDetailDto.getRole());

        return userDetailsRepo.save(userDetail);
    }

    public LoginResponseDto login(LoginRequestDto loginRequestDto){
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();
        UserDetail user = userDetailsRepo.findByEmail(email).orElseThrow(
                ()-> new RuntimeException("Invalid username or password"));
//        if(!user.getPassword().equals(password)){
//            throw new RuntimeException("Invalid username or password");
//        }
//        passwordEncoder.matches(rawPassword, hashedPassword/encodedPass)
        if(!passwordEncoder.matches(password, user.getPassword()) ){
            throw new RuntimeException("Invalid username or password");
        }
        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        return new LoginResponseDto(token, user.getId(), user.getFirstName(), user.getEmail(), user.getRole());
    }

    public void addFavouriteProperty(Long userId, Long propertyId){
        UserDetail user = userDetailsRepo.findById(userId).orElseThrow(
                () -> new RuntimeException("Invalid username or password")
        );
        Property property = propertyRepo.findById(propertyId).orElseThrow(
                () -> new RuntimeException("Property Not Found")
        );
        user.getFavourites().add(property);
        userDetailsRepo.save(user);
        return;
    }
    public Set<PropertyListResponseDto> getFavouriteProperty(Long userId){
        UserDetail user = userDetailsRepo.findById(userId).orElseThrow(
                () -> new RuntimeException("Invalid username or password")
        );
        return user.getFavourites().stream()
                .map(propertyMapper::toListDto)
                .collect(Collectors.toSet());
    }

    public void deleteFavouriteProperty(Long userId, Long propertyId){
        UserDetail user = userDetailsRepo.findById(userId).orElseThrow(
                () -> new RuntimeException("Invalid username or password")
        );
        Property property = propertyRepo.findById(propertyId).orElseThrow(
                () -> new RuntimeException("Property Not Found")
        );
        user.getFavourites().remove(property);
        userDetailsRepo.save(user);
        return;
    }
}
