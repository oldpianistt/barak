package com.ercan.barak.Mappers;

import com.ercan.barak.Controllers.Requests.CreateMarbleImageRequest;
import com.ercan.barak.Controllers.Requests.UpdateMarbleImageRequest;
import com.ercan.barak.Controllers.Responses.MarbleImageResponse;
import com.ercan.barak.Models.MarbleImage;
import org.springframework.stereotype.Component;

@Component
public class MarbleImageMapper {

    public MarbleImage toEntity(CreateMarbleImageRequest request) {
        if (request == null) {
            return null;
        }
        return MarbleImage.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .colorTone(request.getColorTone())
                .surfaceFinish(request.getSurfaceFinish())
                .originCountry(request.getOriginCountry())
                .category(request.getCategory())
                .density(request.getDensity())
                .waterAbsorption(request.getWaterAbsorption())
                .compressiveStrength(request.getCompressiveStrength())
                .flexuralStrength(request.getFlexuralStrength())
                .stockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0)
                .isVisible(request.getIsVisible() != null ? request.getIsVisible() : true)
                .orderIndex(request.getOrderIndex())
                .build();
    }

    public MarbleImageResponse toResponse(MarbleImage entity, String baseUrl) {
        if (entity == null) {
            return null;
        }

        // Build full image URL from imagePath
        // imagePath is stored as "uploads/marble-images/filename.jpg"
        // We need to make it accessible via
        // http://localhost:8081/uploads/marble-images/filename.jpg
        String fullImageUrl = null;
        if (entity.getImagePath() != null) {
            // Add leading slash if not present to create absolute URL path
            String path = entity.getImagePath();
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            fullImageUrl = path;
        }

        return MarbleImageResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .colorTone(entity.getColorTone())
                .surfaceFinish(entity.getSurfaceFinish())
                .originCountry(entity.getOriginCountry())
                .category(entity.getCategory())
                .density(entity.getDensity())
                .waterAbsorption(entity.getWaterAbsorption())
                .compressiveStrength(entity.getCompressiveStrength())
                .flexuralStrength(entity.getFlexuralStrength())
                .stockQuantity(entity.getStockQuantity())
                .isVisible(entity.getIsVisible())
                .orderIndex(entity.getOrderIndex())
                .imageUrl(fullImageUrl)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public void updateEntity(MarbleImage entity, UpdateMarbleImageRequest request) {
        if (request == null || entity == null) {
            return;
        }
        if (request.getTitle() != null)
            entity.setTitle(request.getTitle());
        if (request.getDescription() != null)
            entity.setDescription(request.getDescription());
        if (request.getColorTone() != null)
            entity.setColorTone(request.getColorTone());
        if (request.getSurfaceFinish() != null)
            entity.setSurfaceFinish(request.getSurfaceFinish());
        if (request.getOriginCountry() != null)
            entity.setOriginCountry(request.getOriginCountry());
        if (request.getCategory() != null)
            entity.setCategory(request.getCategory());
        if (request.getDensity() != null)
            entity.setDensity(request.getDensity());
        if (request.getWaterAbsorption() != null)
            entity.setWaterAbsorption(request.getWaterAbsorption());
        if (request.getCompressiveStrength() != null)
            entity.setCompressiveStrength(request.getCompressiveStrength());
        if (request.getFlexuralStrength() != null)
            entity.setFlexuralStrength(request.getFlexuralStrength());
        if (request.getStockQuantity() != null)
            entity.setStockQuantity(request.getStockQuantity());
        if (request.getIsVisible() != null)
            entity.setIsVisible(request.getIsVisible());
        if (request.getOrderIndex() != null)
            entity.setOrderIndex(request.getOrderIndex());
    }
}
