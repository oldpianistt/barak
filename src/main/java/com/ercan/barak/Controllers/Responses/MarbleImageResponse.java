package com.ercan.barak.Controllers.Responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarbleImageResponse {

    private Long id;
    private String title;
    private String description;
    private String colorTone;
    private String surfaceFinish;
    private String originCountry;
    private String category;
    private String density;
    private String waterAbsorption;
    private String compressiveStrength;
    private String flexuralStrength;
    private Boolean isVisible;
    private Integer orderIndex;
    private Integer stockQuantity;
    private Boolean deleted;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
