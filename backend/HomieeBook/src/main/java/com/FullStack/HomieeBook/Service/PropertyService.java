package com.FullStack.HomieeBook.Service;

import com.FullStack.HomieeBook.Dto.amenitiesDto.AmenitiesResponseDto;
import com.FullStack.HomieeBook.Dto.ownerDto.OwnerResponseDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyCreateRequestDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyDetailsResponseDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyListResponseDto;
import com.FullStack.HomieeBook.Dto.reviewDto.ReviewResponseDto;
import com.FullStack.HomieeBook.Mapper.PropertyMapper;
import com.FullStack.HomieeBook.Model.Amenities;
import com.FullStack.HomieeBook.Model.OwnerInfo;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.Review;
import com.FullStack.HomieeBook.Repository.AmenitiesRepository;
import com.FullStack.HomieeBook.Repository.OwnerInfoRepository;
import com.FullStack.HomieeBook.Repository.PropertyRepo;
import com.FullStack.HomieeBook.Repository.UserDetailsRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private PropertyRepo propertyRepo;
    private OwnerInfoRepository ownerInfoRepository;
    private AmenitiesRepository amenitiesRepository;
    private final PropertyMapper propertyMapper;
    private final UserDetailsRepo  userDetailsRepo;

    public PropertyService(PropertyRepo propertyRepo, OwnerInfoRepository ownerInfoRepository,
                           AmenitiesRepository amenitiesRepository,  PropertyMapper propertyMapper,
                           UserDetailsRepo  userDetailsRepo) {
        this.propertyRepo = propertyRepo;
        this.ownerInfoRepository = ownerInfoRepository;
        this.amenitiesRepository = amenitiesRepository;
        this.propertyMapper = propertyMapper;
        this.userDetailsRepo = userDetailsRepo;
    }
    public Property addProperty(PropertyCreateRequestDto propertyCreate) {
        Property property = new Property();
        property.setHouseName(propertyCreate.getHouseName());
        property.setLocation(propertyCreate.getLocation());
        property.setPrice(propertyCreate.getPrice());
        property.setRating(propertyCreate.getRating());
        property.setImageUrl(propertyCreate.getImageUrl()); //The Cloudinary service handles uploading and returns the URL. Your PropertyService simply receives the URL and saves it.
        property.setHouseFeatures(propertyCreate.getHouseFeatures());
        property.setDescription(propertyCreate.getDescription());
        property.setCreatedAt(LocalDateTime.now());
        property.setVerified(true);
        if (propertyCreate.getOwnerInfo() != null) {
            OwnerInfo owner = getOrCreateOwner(propertyCreate.getOwnerInfo());
            property.setOwnerInfo(owner);
        }
        if(propertyCreate.getAmenities() != null) {
            Set<Amenities> amenities = propertyCreate.getAmenities()
                    .stream()
                    .map(this::getOrCreateAmenities)
                    .collect(Collectors.toSet());
            property.setAmenities(amenities);
        }
        return propertyRepo.save(property);
    }

//    public List<PropertyListResponseDto> getAllProperties() {
//        return propertyRepo.findAll()
//                .stream()
//                .map(propertyMapper::toListDto)
//                .toList();
//    }
    public Page<PropertyListResponseDto> getAllProperties(int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        return propertyRepo
                .findAll(pageable)
                .map(propertyMapper::toListDto);
    }

    public PropertyDetailsResponseDto getPropertyById(Long id) {
        Property property=  propertyRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));
        return propertyMapper.toDetailDto(property);
    }
    public Property updateProperty(PropertyCreateRequestDto propertyCreate, Long id) {

        Property property = propertyRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));
        property.setHouseName(propertyCreate.getHouseName());
        property.setLocation(propertyCreate.getLocation());
        property.setPrice(propertyCreate.getPrice());
        property.setRating(propertyCreate.getRating());
        property.setDescription(propertyCreate.getDescription());
        property.setImageUrl(propertyCreate.getImageUrl());
        property.setHouseFeatures(propertyCreate.getHouseFeatures());

        if (propertyCreate.getOwnerInfo() != null) {
            OwnerInfo owner = getOrCreateOwner(
                    propertyCreate.getOwnerInfo()
            );
            property.setOwnerInfo(owner);
        }
        if (propertyCreate.getAmenities() != null) {
            Set<Amenities> amenities = propertyCreate.getAmenities()
                    .stream()
                    .map(this::getOrCreateAmenities)
                    .collect(Collectors.toSet());

            property.setAmenities(amenities);
        }
        return propertyRepo.save(property);
    }
    @Transactional
    public void deleteProperty(Long id) {
        if (!propertyRepo.existsById(id)) {
            throw new RuntimeException("Property not found");
        }
        userDetailsRepo.removePropertyFromFavourites(id);
        propertyRepo.deleteById(id);
    }
    private OwnerInfo getOrCreateOwner(OwnerInfo ownerInfo) {
        return ownerInfoRepository.findByOwnerEmail(ownerInfo.getOwnerEmail())
                .orElseGet(() -> ownerInfoRepository.save(ownerInfo));
    }
    private Amenities getOrCreateAmenities(String name) {
        return amenitiesRepository.findByName(name)
                .orElseGet(() ->{
                    Amenities amenities = new Amenities();
                    amenities.setName(name);
                    return amenitiesRepository.save(amenities);
                });
    }
}

