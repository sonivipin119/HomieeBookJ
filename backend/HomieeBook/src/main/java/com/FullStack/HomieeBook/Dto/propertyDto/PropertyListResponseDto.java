package com.FullStack.HomieeBook.Dto.propertyDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyListResponseDto {
    private Long id;
    private String houseName;
    private BigDecimal price;
    private Double rating;
    private String location;
    private String imageUrl;
}
