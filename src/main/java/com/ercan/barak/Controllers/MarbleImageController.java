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
@RequestMapping("/api/admin/marble-images")
@RequiredArgsConstructor
public class MarbleImageController {

    private final MarbleImageService service;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<MarbleImageResponse> create(
            @RequestPart("request") @Valid CreateMarbleImageRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        // Enforce imageFile requirement if needed, user said it's created via
        // multipart.
        // User request: "Görsel dosyası request’te MultipartFile olarak Controller
        // seviyesinde ayrı parametre olsun"
        return new ResponseEntity<>(service.create(request, imageFile), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<MarbleImageResponse> update(
            @PathVariable Long id,
            @RequestPart("request") @Valid UpdateMarbleImageRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        return ResponseEntity.ok(service.update(id, request, imageFile));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarbleImageResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<MarbleImageResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean onlyVisible) {
        return ResponseEntity.ok(service.list(page, size, onlyVisible));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
