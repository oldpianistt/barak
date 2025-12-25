package com.ercan.barak.Mappers;

import com.ercan.barak.Controllers.Requests.CreateHeroSlideRequest;
import com.ercan.barak.Controllers.Requests.UpdateHeroSlideRequest;
import com.ercan.barak.Controllers.Responses.HeroSlideResponse;
import com.ercan.barak.Models.HeroSlideImage;
import org.springframework.stereotype.Component;

@Component
public class HeroSlideImageMapper {

    public HeroSlideImage toEntity(CreateHeroSlideRequest request) {
        return HeroSlideImage.builder()
                .title(request.getTitle())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .deleted(false)
                .build();
    }

    public void updateEntity(HeroSlideImage entity, UpdateHeroSlideRequest request) {
        if (request.getTitle() != null) {
            entity.setTitle(request.getTitle());
        }
        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getIsActive() != null) {
            entity.setIsActive(request.getIsActive());
        }
    }

    public HeroSlideResponse toResponse(HeroSlideImage entity, String baseUrl) {
        // Build full image URL
        String fullImageUrl = null;
        if (entity.getImagePath() != null) {
            fullImageUrl = baseUrl + "/" + entity.getImagePath();
        }

        return HeroSlideResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .imageUrl(fullImageUrl)
                .displayOrder(entity.getDisplayOrder())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
