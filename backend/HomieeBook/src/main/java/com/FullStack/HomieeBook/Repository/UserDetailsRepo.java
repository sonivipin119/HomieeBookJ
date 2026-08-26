package com.FullStack.HomieeBook.Repository;

import com.FullStack.HomieeBook.Model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailsRepo extends JpaRepository<UserDetail, Long> {
    Optional<UserDetail>findByEmail(String email);
    @Modifying
    @Query(value = """
            DELETE FROM user_favourite_property
            WHERE property_id = :propertyId
            """, nativeQuery = true)
    void removePropertyFromFavourites(@Param("propertyId") Long propertyId);
}
