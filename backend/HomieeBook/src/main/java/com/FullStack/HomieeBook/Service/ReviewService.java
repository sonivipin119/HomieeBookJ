package com.FullStack.HomieeBook.Service;

import com.FullStack.HomieeBook.Dto.reviewDto.ReviewCreateRequestDto;
import com.FullStack.HomieeBook.Dto.reviewDto.ReviewResponseDto;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.Review;
import com.FullStack.HomieeBook.Repository.PropertyRepo;
import com.FullStack.HomieeBook.Repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PropertyRepo propertyRepo;
    public ReviewService(ReviewRepository reviewRepository, PropertyRepo propertyRepo) {
        this.reviewRepository = reviewRepository;
        this.propertyRepo = propertyRepo;
    }
    public ReviewResponseDto AddReview(Long propertyId, ReviewCreateRequestDto reviewReq){
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        Review review = new Review();

        review.setRating(reviewReq.getRating());
        review.setComment(reviewReq.getComment());
        review.setReviewerName(reviewReq.getReviewerName());

        // Set property from URL, not from request body
        review.setProperty(property);

        Review savedReview = reviewRepository.save(review);

        return new ReviewResponseDto(
                savedReview.getId(), savedReview.getRating(),savedReview.getComment(), savedReview.getReviewerName()
        );

    }
    public List<ReviewResponseDto> getReviewsByProperty(Long propertyId) {
        return reviewRepository.findByPropertyId(propertyId).stream()
                .map(review -> new ReviewResponseDto(
                        review.getId(),
                        review.getRating(),
                        review.getComment(),
                        review.getReviewerName()
                )).collect(Collectors.toList());
    }

}

