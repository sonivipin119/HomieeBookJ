package com.FullStack.HomieeBook.Repository;

import com.FullStack.HomieeBook.Model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Bookings, Long> {
    List<Bookings> findByPropertyId(Long propertyId);
    List<Bookings> findByUserDetailId(Long userId);
}
