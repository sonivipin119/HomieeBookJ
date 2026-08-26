package com.FullStack.HomieeBook.Dto.reviewDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCreateRequestDto {
    private Integer rating;
    private String comment;
    private String reviewerName;
}
