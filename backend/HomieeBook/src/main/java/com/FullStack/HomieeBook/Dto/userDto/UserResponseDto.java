package com.FullStack.HomieeBook.Dto.userDto;

import com.FullStack.HomieeBook.Model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String email;
    private UserRole role;
}
