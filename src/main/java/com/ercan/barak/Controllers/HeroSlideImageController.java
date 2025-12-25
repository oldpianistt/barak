package com.ercan.barak.Controllers;

import com.ercan.barak.Controllers.Requests.CreateHeroSlideRequest;
import com.ercan.barak.Controllers.Requests.UpdateHeroSlideRequest;
import com.ercan.barak.Controllers.Responses.HeroSlideResponse;
import com.ercan.barak.Services.HeroSlideImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HeroSlideImageController {

    private final HeroSlideImageService service;

    // Public endpoint - get active hero slides for homepage
    @GetMapping("/public/hero-slides")
    public ResponseEntity<List<HeroSlideResponse>> getAllActive() {
        return ResponseEntity.ok(service.getAllActive());
    }

    // Admin endpoints - require authentication
    @GetMapping("/admin/hero-slides")
    public ResponseEntity<List<HeroSlideResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/admin/hero-slides/{id}")
    public ResponseEntity<HeroSlideResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping(value = "/admin/hero-slides", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<HeroSlideResponse> create(
            @RequestPart("request") @Valid CreateHeroSlideRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        return new ResponseEntity<>(service.create(request, imageFile), HttpStatus.CREATED);
    }

    @PutMapping(value = "/admin/hero-slides/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<HeroSlideResponse> update(
            @PathVariable Long id,
            @RequestPart("request") @Valid UpdateHeroSlideRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        return ResponseEntity.ok(service.update(id, request, imageFile));
    }

    @DeleteMapping("/admin/hero-slides/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
