package com.FullStack.HomieeBook.Controller;

import com.FullStack.HomieeBook.Dto.reviewDto.ReviewCreateRequestDto;
import com.FullStack.HomieeBook.Dto.reviewDto.ReviewResponseDto;
import com.FullStack.HomieeBook.Model.Review;
import com.FullStack.HomieeBook.Service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @PostMapping("/{propertyId}/reviews")
    public ResponseEntity<ReviewResponseDto> addReview(@PathVariable Long propertyId,
                                                       @RequestBody ReviewCreateRequestDto review) {
        ReviewResponseDto savedReview = reviewService.AddReview(propertyId, review);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }
    @GetMapping("/{propertyId}/reviews")
    public ResponseEntity<List<ReviewResponseDto>> getReviews(@PathVariable Long propertyId) {

        return ResponseEntity.ok(reviewService.getReviewsByProperty(propertyId));
    }

}
