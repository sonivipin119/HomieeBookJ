package com.FullStack.HomieeBook.Repository;

import com.FullStack.HomieeBook.Model.Amenities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AmenitiesRepository extends JpaRepository<Amenities, Integer> {
    Optional<Amenities> findByName(String name);
}
