package com.FullStack.HomieeBook.Dto.propertyDto;


import com.FullStack.HomieeBook.Model.HouseFeatures;
import com.FullStack.HomieeBook.Model.OwnerInfo;
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
public class PropertyCreateRequestDto {
    private String houseName;
    private BigDecimal price;
    private String location;
    private Double rating;
    private String imageUrl;
    private String description;
    private HouseFeatures houseFeatures;

    private List<String> amenities;
    private OwnerInfo  ownerInfo;
}
