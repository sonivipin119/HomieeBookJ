package com.FullStack.HomieeBook.Mapper;

import com.FullStack.HomieeBook.Dto.BookingDTo.BookingRequestDto;
import com.FullStack.HomieeBook.Dto.BookingDTo.BookingResponseDto;
import com.FullStack.HomieeBook.Model.Bookings;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Service.BookingService;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingResponseDto bookingDto(Bookings bookings) {
       BookingResponseDto bookingResponseDto = new BookingResponseDto();
       Property property = bookings.getProperty();
       bookingResponseDto.setHouseName(property.getHouseName());
       bookingResponseDto.setLocation(property.getLocation());
       bookingResponseDto.setCheckIn(bookings.getCheckInDate());
       bookingResponseDto.setCheckOut(bookings.getCheckOutDate());
       bookingResponseDto.setNoOfGuests(bookings.getNoOfGuests());
       bookingResponseDto.setTotalAmount(bookings.getTotalAmount());
       bookingResponseDto.setBookedAt(bookings.getBookedAt());

       return  bookingResponseDto;
    }
}
