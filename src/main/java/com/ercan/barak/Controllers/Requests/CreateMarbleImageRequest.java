package com.ercan.barak.Controllers.Requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMarbleImageRequest {

    @NotBlank(message = "Title cannot be empty")
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

    @Builder.Default
    private Boolean isVisible = true;

    @Min(value = 0, message = "Order index must be 0 or greater")
    private Integer orderIndex;

    @Min(value = 0, message = "Stock quantity must be 0 or greater")
    @Builder.Default
    private Integer stockQuantity = 0;
}
