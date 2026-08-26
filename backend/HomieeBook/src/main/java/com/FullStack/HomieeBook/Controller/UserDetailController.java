package com.FullStack.HomieeBook.Controller;

import com.FullStack.HomieeBook.Dto.propertyDto.PropertyListResponseDto;
import com.FullStack.HomieeBook.Dto.userDto.LoginRequestDto;
import com.FullStack.HomieeBook.Dto.userDto.LoginResponseDto;
import com.FullStack.HomieeBook.Dto.userDto.UserDetailRequestDto;
import com.FullStack.HomieeBook.Dto.userDto.UserResponseDto;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.UserDetail;
import com.FullStack.HomieeBook.Repository.UserDetailsRepo;
import com.FullStack.HomieeBook.Service.UserDetailsService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDetailController {
    private final UserDetailsService userDetailsService;
    private final UserDetailsRepo  userDetailsRepo;
    public UserDetailController(UserDetailsService userDetailsService,  UserDetailsRepo  userDetailsRepo) {
        this.userDetailsService = userDetailsService;
        this.userDetailsRepo = userDetailsRepo;
    }

    @GetMapping("/me")
    public UserResponseDto getCurrentUser(Authentication authentication) {
        String email = authentication.getName();

        UserDetail user = userDetailsRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getEmail(),
                user.getRole()
        );
    }
    @PostMapping
    public ResponseEntity<UserDetail> SignUp(@RequestBody UserDetailRequestDto userDetailDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userDetailsService.SignUp(userDetailDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> Login( @RequestBody LoginRequestDto loginRequest){
        return ResponseEntity.status(HttpStatus.OK).body(userDetailsService.login(loginRequest));
    }

    @PostMapping("/{userId}/favourites/{propertyId}")
    public ResponseEntity<String> addFavourite(@PathVariable Long userId, @PathVariable Long propertyId){
        userDetailsService.addFavouriteProperty(userId, propertyId);

        return ResponseEntity.ok("Property added to favourites");
    }
    @GetMapping("/{userId}/favourites")
    public ResponseEntity<Set<PropertyListResponseDto>> getFavourites(@PathVariable Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(userDetailsService.getFavouriteProperty(userId));
    }
    @DeleteMapping("/{userId}/favourites/{propertyId}")
    public ResponseEntity<String> deleteFavourite(@PathVariable Long userId, @PathVariable Long propertyId){
        userDetailsService.deleteFavouriteProperty(userId, propertyId);

        return ResponseEntity.ok("Property removed from favourites");
    }
}
