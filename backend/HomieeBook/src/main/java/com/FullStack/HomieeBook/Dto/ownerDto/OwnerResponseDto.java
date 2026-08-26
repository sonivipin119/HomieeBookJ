package com.FullStack.HomieeBook.Dto.ownerDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerResponseDto {
    private Long id;
    private String ownerName;
    private String ownerEmail;
    private String contactNumber;
    private String ownerAddress;
}
