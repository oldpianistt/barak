package com.ercan.barak.Controllers.Requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateHeroSlideRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private Integer displayOrder;

    private Boolean isActive;
}
