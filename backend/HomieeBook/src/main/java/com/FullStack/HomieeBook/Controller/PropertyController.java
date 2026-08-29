package com.FullStack.HomieeBook.Controller;

import com.FullStack.HomieeBook.Dto.propertyDto.PropertyCreateRequestDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyDetailsResponseDto;
import com.FullStack.HomieeBook.Dto.propertyDto.PropertyListResponseDto;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Service.ImageUploadService;
import com.FullStack.HomieeBook.Service.PropertyService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService  propertyService;
    private final ImageUploadService imageUploadService;
    public PropertyController(PropertyService propertyService , ImageUploadService imageUploadService) {
        this.propertyService = propertyService;
        this.imageUploadService = imageUploadService;
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(
            @RequestBody PropertyCreateRequestDto property) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(propertyService.addProperty(property));
    }

//    @GetMapping
//    public ResponseEntity<List<PropertyListResponseDto>> getAllProperties() {
//        return ResponseEntity.ok(
//                propertyService.getAllProperties()
//        );
//    }
    @GetMapping
    public ResponseEntity<Page<PropertyListResponseDto>> getAllProperties(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ResponseEntity.ok(
                propertyService.getAllProperties(page, size)
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDetailsResponseDto> getPropertyById(
            @PathVariable Long id) {
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@RequestBody PropertyCreateRequestDto property, @PathVariable Long id) {
        return ResponseEntity.ok(propertyService.updateProperty(property, id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}
