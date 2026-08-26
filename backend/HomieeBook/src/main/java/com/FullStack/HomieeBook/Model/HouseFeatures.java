package com.FullStack.HomieeBook.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class HouseFeatures {
     private Integer bedrooms;
     private Integer bathrooms;
     private Integer kitchens;
     private Integer balconies;

     @Enumerated(EnumType.STRING)
     private ParkingType parkingType;

     @Enumerated(EnumType.STRING)
     private FurnishingType furnishingType;

}
