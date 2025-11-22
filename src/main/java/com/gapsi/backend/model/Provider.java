package com.gapsi.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "providers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(unique = true, nullable = false)
    private String name;

    @NotBlank(message = "Business Name is required")
    @Column(name = "business_name", nullable = false)
    private String businessName;

    @NotBlank(message = "Address is required")
    @Column(nullable = false)
    private String address;
}
