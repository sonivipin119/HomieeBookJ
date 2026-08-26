package com.FullStack.HomieeBook.Dto.propertyDto;

import com.FullStack.HomieeBook.Dto.amenitiesDto.AmenitiesResponseDto;
import com.FullStack.HomieeBook.Dto.ownerDto.OwnerResponseDto;
import com.FullStack.HomieeBook.Dto.reviewDto.ReviewResponseDto;
import com.FullStack.HomieeBook.Model.HouseFeatures;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDetailsResponseDto {
    private Long id;
    private String houseName;
    private BigDecimal price;
    private Double rating;
    private String location;
    private String imageUrl;
    private String description;
    private HouseFeatures houseFeatures;
    private Set<AmenitiesResponseDto> amenities;
    private OwnerResponseDto owner;
    private List<ReviewResponseDto> reviews;
}
