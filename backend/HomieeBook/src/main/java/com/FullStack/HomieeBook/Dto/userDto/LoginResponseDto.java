package com.FullStack.HomieeBook.Dto.userDto;

import com.FullStack.HomieeBook.Model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {
//    private String username;
    private String token;
    private Long id;
    private String firstName;
    private String email;
    private UserRole role;

}
