package com.ercan.barak.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "marble_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarbleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String colorTone;

    private String surfaceFinish;

    private String originCountry;

    private String category;

    private String density;

    @Column(name = "water_absorption")
    private String waterAbsorption;

    @Column(name = "compressive_strength")
    private String compressiveStrength;

    @Column(name = "flexural_strength")
    private String flexuralStrength;

    @Builder.Default
    private Boolean isVisible = true;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "stock_quantity")
    @Builder.Default
    private Integer stockQuantity = 0;

    private String imagePath;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder.Default
    private Boolean deleted = false;
}
