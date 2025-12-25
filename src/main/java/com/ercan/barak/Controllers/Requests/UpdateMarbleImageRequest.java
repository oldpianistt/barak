package com.ercan.barak.Controllers.Requests;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateMarbleImageRequest {

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

    @Min(value = 0, message = "Order index must be 0 or greater")
    private Integer orderIndex;

    @Min(value = 0, message = "Stock quantity must be 0 or greater")
    private Integer stockQuantity;
}
