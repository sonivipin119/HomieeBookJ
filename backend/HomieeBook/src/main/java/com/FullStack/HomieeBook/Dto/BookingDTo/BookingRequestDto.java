package com.FullStack.HomieeBook.Dto.BookingDTo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingRequestDto {

    private Long userId;
    private Long propertyId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer noOfGuests;
}
