package com.FullStack.HomieeBook.Mapper;

import com.FullStack.HomieeBook.Dto.amenitiesDto.AmenitiesResponseDto;
import com.FullStack.HomieeBook.Dto.ownerDto.OwnerResponseDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyDetailsResponseDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyListResponseDto;
import com.FullStack.HomieeBook.Dto.reviewDto.ReviewResponseDto;
import com.FullStack.HomieeBook.Model.Amenities;
import com.FullStack.HomieeBook.Model.OwnerInfo;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.Review;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PropertyMapper {

    public PropertyListResponseDto toListDto(Property property) {
        PropertyListResponseDto dto = new PropertyListResponseDto();
        dto.setId(property.getId());
        dto.setHouseName(property.getHouseName());
        dto.setLocation(property.getLocation());
        dto.setRating(property.getRating());
        dto.setPrice(property.getPrice());
        dto.setImageUrl(property.getImageUrl());
        return dto;
    }
    public PropertyDetailsResponseDto toDetailDto(Property property) {
        PropertyDetailsResponseDto dto =
                new PropertyDetailsResponseDto();

        dto.setId(property.getId());
        dto.setHouseName(property.getHouseName());
        dto.setPrice(property.getPrice());
        dto.setRating(property.getRating());
        dto.setLocation(property.getLocation());
        dto.setDescription(property.getDescription());
        dto.setImageUrl(property.getImageUrl());
        dto.setHouseFeatures(property.getHouseFeatures());
        if(property.getAmenities() != null) {
            Set<AmenitiesResponseDto> amenities = property.getAmenities().stream()
                    .map(this::toAmenitiesDto)
                    .collect(Collectors.toSet());
            dto.setAmenities(amenities);
        }
        if(property.getOwnerInfo() != null) {
            dto.setOwner(
                    toOwnerDto(property.getOwnerInfo())
            );
        }
        if (property.getReviews() != null) {

            List<ReviewResponseDto> reviews =
                    property.getReviews()
                            .stream()
                            .map(this::toReviewDto)
                            .toList();

            dto.setReviews(reviews);
        }
        return dto;

    }
    public AmenitiesResponseDto toAmenitiesDto(
            Amenities amenities) {

        AmenitiesResponseDto dto =
                new AmenitiesResponseDto();

        dto.setId(amenities.getId());
        dto.setName(amenities.getName());

        return dto;
    }
    public OwnerResponseDto toOwnerDto(
            OwnerInfo owner) {

        OwnerResponseDto dto =
                new OwnerResponseDto();

        dto.setId(owner.getId());
        dto.setOwnerName(owner.getOwnerName());
        dto.setOwnerEmail(owner.getOwnerEmail());
        dto.setContactNumber(owner.getContactNumber());
        dto.setOwnerAddress(owner.getOwnerAddress());

        return dto;
    }
    public ReviewResponseDto toReviewDto(
            Review review) {

        ReviewResponseDto dto =
                new ReviewResponseDto();

        dto.setId(review.getId());
        dto.setComment(review.getComment());
        dto.setRating(review.getRating());
        dto.setReviewerName(review.getReviewerName());
        return dto;
    }
}
