package com.ercan.barak.Controllers;

import com.ercan.barak.Controllers.Requests.CreateMarbleImageRequest;
import com.ercan.barak.Controllers.Requests.UpdateMarbleImageRequest;
import com.ercan.barak.Controllers.Responses.MarbleImageResponse;
import com.ercan.barak.Controllers.Responses.PageResponse;
import com.ercan.barak.Services.MarbleImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MarbleImageController {

    private final MarbleImageService service;

    // Public endpoints - no authentication required
    @GetMapping("/public/marble-images")
    public ResponseEntity<PageResponse<MarbleImageResponse>> listPublic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        // Only show visible marbles to public
        return ResponseEntity.ok(service.list(page, size, true));
    }

    @GetMapping("/public/marble-images/{id}")
    public ResponseEntity<MarbleImageResponse> getByIdPublic(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // Admin endpoints - require authentication
    @PostMapping(value = "/admin/marble-images", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<MarbleImageResponse> create(
            @RequestPart("request") @Valid CreateMarbleImageRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        // Enforce imageFile requirement if needed, user said it's created via
        // multipart.
        // User request: "Görsel dosyası request'te MultipartFile olarak Controller
        // seviyesinde ayrı parametre olsun"
        return new ResponseEntity<>(service.create(request, imageFile), HttpStatus.CREATED);
    }

    @PutMapping(value = "/admin/marble-images/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<MarbleImageResponse> update(
            @PathVariable Long id,
            @RequestPart("request") @Valid UpdateMarbleImageRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        return ResponseEntity.ok(service.update(id, request, imageFile));
    }

    @GetMapping("/admin/marble-images/{id}")
    public ResponseEntity<MarbleImageResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/admin/marble-images")
    public ResponseEntity<PageResponse<MarbleImageResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean onlyVisible) {
        return ResponseEntity.ok(service.list(page, size, onlyVisible));
    }

    @DeleteMapping("/admin/marble-images/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
