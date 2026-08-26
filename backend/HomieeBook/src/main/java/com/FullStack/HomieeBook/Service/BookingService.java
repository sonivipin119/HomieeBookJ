package com.FullStack.HomieeBook.Service;

import com.FullStack.HomieeBook.Dto.BookingDTo.BookingRequestDto;
import com.FullStack.HomieeBook.Dto.BookingDTo.BookingResponseDto;
import com.FullStack.HomieeBook.Mapper.BookingMapper;
import com.FullStack.HomieeBook.Model.Bookings;
import com.FullStack.HomieeBook.Model.Property;
import com.FullStack.HomieeBook.Model.UserDetail;
import com.FullStack.HomieeBook.Repository.BookingRepo;
import com.FullStack.HomieeBook.Repository.PropertyRepo;
import com.FullStack.HomieeBook.Repository.UserDetailsRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    private final PropertyRepo propertyRepo;
    private final BookingRepo bookingRepo;
    private final UserDetailsRepo userDetailsRepo;
    private final BookingMapper  bookingMapper;
    public BookingService(PropertyRepo propertyRepo,  BookingRepo bookingRepo, UserDetailsRepo userDetailsRepo
    ,  BookingMapper bookingMapper) {
        this.propertyRepo = propertyRepo;
        this.bookingRepo = bookingRepo;
        this.userDetailsRepo = userDetailsRepo;
        this.bookingMapper = bookingMapper;
    }

    public Bookings createBookings(BookingRequestDto bookingReq){
        UserDetail user = userDetailsRepo.findById(bookingReq.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Property property = propertyRepo.findById(bookingReq.getPropertyId())
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));
        if(bookingReq.getCheckIn()==null ||  bookingReq.getCheckOut()==null){
            throw new RuntimeException("Check In or Check Out are required");
        }
        if(!bookingReq.getCheckOut().isAfter(bookingReq.getCheckIn())){
            throw new RuntimeException("Check Out date is not after Check In date");
        }
        if(bookingReq.getCheckIn().isBefore(LocalDate.now())){
            throw new RuntimeException("Check In must be today or in Available dates");
        }
        long nights = ChronoUnit.DAYS.between(bookingReq.getCheckIn(),bookingReq.getCheckOut());

        double totalAmount =
                property.getPrice().doubleValue() * nights;
        Bookings booking = new Bookings();

        booking.setUserDetail(user);
        booking.setProperty(property);
        booking.setCheckInDate(bookingReq.getCheckIn());
        booking.setCheckOutDate(bookingReq.getCheckOut());
        booking.setNoOfGuests(bookingReq.getNoOfGuests());
        booking.setTotalAmount(totalAmount);
        booking.setBookedAt(LocalDateTime.now());
//        booking.setStatus(BookingStatus.PENDING);
        return bookingRepo.save(booking);
    }
    public List<BookingResponseDto> getBookings(Long userId){
        return bookingRepo.findByUserDetailId(userId)
                .stream()
                .map(bookingMapper::bookingDto)
                .toList();
    }
    public List<Bookings> getBookingsByProperty(Long propertyId) {

        return bookingRepo.findByPropertyId(propertyId);

    }
}
