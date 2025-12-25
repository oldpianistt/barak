package com.ercan.barak.Services;

import com.ercan.barak.Controllers.Requests.CreateMarbleImageRequest;
import com.ercan.barak.Controllers.Requests.UpdateMarbleImageRequest;
import com.ercan.barak.Controllers.Responses.MarbleImageResponse;
import com.ercan.barak.Controllers.Responses.PageResponse;
import com.ercan.barak.Mappers.MarbleImageMapper;
import com.ercan.barak.Models.MarbleImage;
import com.ercan.barak.Repositories.MarbleImageRepository;
import com.ercan.barak.Utils.FileStorageUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarbleImageService {

    private final MarbleImageRepository repository;
    private final FileStorageUtil fileStorageUtil;
    private final MarbleImageMapper mapper;

    @Transactional
    public MarbleImageResponse create(CreateMarbleImageRequest request, MultipartFile imageFile) {
        String fileName = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            fileName = fileStorageUtil.saveFile(imageFile);
        }

        MarbleImage entity = mapper.toEntity(request);
        // Store path with uploads prefix so Mapper can build correct URL
        if (fileName != null) {
            entity.setImagePath("uploads/marble-images/" + fileName);
        }

        MarbleImage savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity, getBaseUrl());
    }

    @Transactional
    public MarbleImageResponse update(Long id, UpdateMarbleImageRequest request, MultipartFile imageFile) {
        MarbleImage entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marble Image not found with id: " + id));

        // Update metadata
        mapper.updateEntity(entity, request);

        // Update file if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            // Optional: delete old file
            if (entity.getImagePath() != null) {
                // Extract just the filename from the path for deletion
                String oldFileName = entity.getImagePath().replace("uploads/marble-images/", "");
                fileStorageUtil.deleteFile(oldFileName);
            }
            String fileName = fileStorageUtil.saveFile(imageFile);
            // Store path with uploads prefix
            entity.setImagePath("uploads/marble-images/" + fileName);
        }

        MarbleImage savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity, getBaseUrl());
    }

    public MarbleImageResponse getById(Long id) {
        MarbleImage entity = repository.findById(id)
                .filter(m -> !m.getDeleted()) // Ensure not deleted
                .orElseThrow(() -> new RuntimeException("Marble Image not found with id: " + id));
        return mapper.toResponse(entity, getBaseUrl());
    }

    public PageResponse<MarbleImageResponse> list(int page, int size, Boolean onlyVisible) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderIndex").ascending());

        Page<MarbleImage> entityPage;
        if (onlyVisible != null && onlyVisible) {
            entityPage = repository.findAllByDeletedFalseAndIsVisibleTrue(pageable);
        } else {
            entityPage = repository.findAllByDeletedFalse(pageable);
        }

        List<MarbleImageResponse> content = entityPage.getContent().stream()
                .map(entity -> mapper.toResponse(entity, getBaseUrl()))
                .collect(Collectors.toList());

        return PageResponse.<MarbleImageResponse>builder()
                .content(content)
                .page(entityPage.getNumber())
                .size(entityPage.getSize())
                .totalElements(entityPage.getTotalElements())
                .totalPages(entityPage.getTotalPages())
                .last(entityPage.isLast())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        MarbleImage entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marble Image not found with id: " + id));

        entity.setDeleted(true);
        repository.save(entity);

        // Soft delete: Do NOT delete the physical file yet.
    }

    // Helper to get base URL for image links
    private String getBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/uploads/marble-images/";
        // Note: Providing direct file access usually requires ResourceHandler registry.
        // I will implement ResourceHandler in Configuration later to expose /uploads/
        // For now, I assume the mapper/response needs the full URL or just path.
        // My Mapper implementation uses the path directly if not handled.
        // Here I return a dummy base or the correct one if I set up static resource
        // serving.
        // For this task, returning the imagePath (filename) is often enough if the
        // frontend knows the base URL.
        // But the requirement says "imageUrl (client’ın erişeceği URL)".
        // So I will return the full URL assuming I will configure static resource
        // mapping for /uploads/** -> file:uploads/
    }
}
