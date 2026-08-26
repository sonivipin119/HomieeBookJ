package com.FullStack.HomieeBook.Repository;

import com.FullStack.HomieeBook.Model.OwnerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerInfoRepository extends JpaRepository<OwnerInfo, Long> {
    Optional<OwnerInfo> findByOwnerEmail(String ownerEmail);
}
