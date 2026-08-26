package com.FullStack.HomieeBook.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OwnerInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String ownerName;
    @Column(unique = true, nullable = false)
    private String ownerEmail;
    @Column(unique = true, nullable = false)
    private String contactNumber;
    private String ownerAddress;

    @OneToMany(mappedBy = "ownerInfo")
    @JsonIgnore
    private List<Property> properties = new ArrayList<>();
}
