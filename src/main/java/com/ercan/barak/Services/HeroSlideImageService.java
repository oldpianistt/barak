package com.ercan.barak.Services;

import com.ercan.barak.Controllers.Requests.CreateHeroSlideRequest;
import com.ercan.barak.Controllers.Requests.UpdateHeroSlideRequest;
import com.ercan.barak.Controllers.Responses.HeroSlideResponse;
import com.ercan.barak.Mappers.HeroSlideImageMapper;
import com.ercan.barak.Models.HeroSlideImage;
import com.ercan.barak.Repositories.HeroSlideImageRepository;
import com.ercan.barak.Utils.FileStorageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeroSlideImageService {

    private final HeroSlideImageRepository repository;
    private final HeroSlideImageMapper mapper;
    private final FileStorageUtil fileStorageUtil;
    private final HttpServletRequest request;

    private String getBaseUrl() {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();

        StringBuilder url = new StringBuilder();
        url.append(scheme).append("://").append(serverName);

        if ((scheme.equals("http") && serverPort != 80) ||
                (scheme.equals("https") && serverPort != 443)) {
            url.append(":").append(serverPort);
        }

        return url.toString();
    }

    @Transactional
    public HeroSlideResponse create(CreateHeroSlideRequest request, MultipartFile imageFile) {
        String fileName = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            fileName = fileStorageUtil.saveFile(imageFile);
        }

        HeroSlideImage entity = mapper.toEntity(request);
        // Store path with uploads prefix
        if (fileName != null) {
            entity.setImagePath("uploads/marble-images/" + fileName);
        }

        HeroSlideImage savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity, getBaseUrl());
    }

    @Transactional(readOnly = true)
    public List<HeroSlideResponse> getAllActive() {
        return repository.findAllByDeletedFalseAndIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(entity -> mapper.toResponse(entity, getBaseUrl()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<HeroSlideResponse> getAll() {
        return repository.findAllByDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(entity -> mapper.toResponse(entity, getBaseUrl()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HeroSlideResponse getById(Long id) {
        HeroSlideImage entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));
        return mapper.toResponse(entity, getBaseUrl());
    }

    @Transactional
    public HeroSlideResponse update(Long id, UpdateHeroSlideRequest request, MultipartFile imageFile) {
        HeroSlideImage entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));

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

        HeroSlideImage savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity, getBaseUrl());
    }

    @Transactional
    public void delete(Long id) {
        HeroSlideImage entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));

        // Soft delete
        entity.setDeleted(true);
        repository.save(entity);
    }
}
