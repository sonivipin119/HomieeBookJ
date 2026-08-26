package com.FullStack.HomieeBook.Dto.BookingDTo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class BookingResponseDto {

    private String houseName;
    private String location;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer noOfGuests;
    private Double totalAmount;
    private LocalDateTime bookedAt;
}
