package com.FullStack.HomieeBook.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.action.internal.OrphanRemovalAction;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;

//    @ManyToMany(cascade = Cascade.ALL or .REMOVE)
//    User 1 → Property 4
//    User 2 → Property 4
//    If deleting User 1 cascaded into deleting Property 4, you'd accidentally delete the actual property that User 2 also references.
    @ManyToMany
    @JoinTable(
            name = "user_favourite_property",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private Set<Property> favourites = new HashSet<>();
}
