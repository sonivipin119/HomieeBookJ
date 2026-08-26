package com.FullStack.HomieeBook.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id",  nullable = false)
    private UserDetail userDetail;
    @ManyToOne
    @JoinColumn(name = "property_id" , nullable = false)
    private Property property;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer noOfGuests;
    private Double totalAmount;
    private LocalDateTime bookedAt;
//    @Enumerated(EnumType.STRING)
//    private BookingStatus status;

}
