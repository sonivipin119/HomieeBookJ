package com.FullStack.HomieeBook.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String houseName;
    private BigDecimal price;
    private Double rating;
    @Column(length = 2000)
    private String location;
    private String imageUrl;
    private String description;
    private LocalDateTime createdAt;
    private boolean verified;

    @Embedded
    private HouseFeatures houseFeatures;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_info_id")
    private OwnerInfo ownerInfo;

    @ManyToMany
    @JoinTable(
            name = "property_amenities",
            joinColumns = @JoinColumn(name = "property_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private Set<Amenities> amenities;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

}
