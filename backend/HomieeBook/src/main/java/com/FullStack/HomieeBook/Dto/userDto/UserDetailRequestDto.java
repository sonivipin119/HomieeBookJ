package com.FullStack.HomieeBook.Dto.userDto;

import com.FullStack.HomieeBook.Model.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailRequestDto {
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;
    private UserRole role;
}
