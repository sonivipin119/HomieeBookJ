package com.FullStack.HomieeBook.Controller;

import com.FullStack.HomieeBook.Dto.BookingDTo.BookingRequestDto;
import com.FullStack.HomieeBook.Dto.BookingDTo.BookingResponseDto;
import com.FullStack.HomieeBook.Model.Bookings;
import com.FullStack.HomieeBook.Service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Bookings> createBooking(
            @RequestBody BookingRequestDto bookingRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(bookingService.createBookings(bookingRequest));
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<BookingResponseDto>> getAllBookings(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getBookings(userId));
    }
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Bookings>> getBookingsByProperty(
            @PathVariable Long propertyId) {

        return ResponseEntity.ok(
                bookingService.getBookingsByProperty(propertyId)
        );
    }
}

