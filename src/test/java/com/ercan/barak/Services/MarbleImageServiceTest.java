package com.ercan.barak.Services;

import com.ercan.barak.Controllers.Requests.CreateMarbleImageRequest;
import com.ercan.barak.Controllers.Requests.UpdateMarbleImageRequest;
import com.ercan.barak.Controllers.Responses.MarbleImageResponse;
import com.ercan.barak.Mappers.MarbleImageMapper;
import com.ercan.barak.Models.MarbleImage;
import com.ercan.barak.Repositories.MarbleImageRepository;
import com.ercan.barak.Utils.FileStorageUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MarbleImageServiceTest {

    @Mock
    private MarbleImageRepository repository;

    @Mock
    private FileStorageUtil fileStorageUtil;

    @Mock
    private MarbleImageMapper mapper;

    @InjectMocks
    private MarbleImageService service;

    private MarbleImage marbleImage;
    private CreateMarbleImageRequest createRequest;

    @BeforeEach
    void setUp() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        ServletRequestAttributes attrs = new ServletRequestAttributes(mockRequest);
        RequestContextHolder.setRequestAttributes(attrs);

        marbleImage = MarbleImage.builder()
                .id(1L)
                .title("Test Marble")
                .description("Description")
                .imagePath("test.jpg")
                .deleted(false)
                .build();

        createRequest = new CreateMarbleImageRequest();
        createRequest.setTitle("Test Marble");
    }

    @Test
    void create_ShouldSaveImageAndEntity() {
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.jpg", "image/jpeg", "content".getBytes());
        when(fileStorageUtil.saveFile(any(MultipartFile.class))).thenReturn("unique-test.jpg");
        when(mapper.toEntity(any(CreateMarbleImageRequest.class))).thenReturn(marbleImage);
        when(repository.save(any(MarbleImage.class))).thenReturn(marbleImage);
        when(mapper.toResponse(any(MarbleImage.class), anyString())).thenReturn(new MarbleImageResponse());

        MarbleImageResponse response = service.create(createRequest, file);

        assertNotNull(response);
        verify(fileStorageUtil, times(1)).saveFile(any(MultipartFile.class));
        verify(repository, times(1)).save(any(MarbleImage.class));
    }

    @Test
    void update_ShouldUpdateEntity() {
        MockMultipartFile file = new MockMultipartFile("imageFile", "new.jpg", "image/jpeg", "content".getBytes());

        when(repository.findById(1L)).thenReturn(Optional.of(marbleImage));
        when(fileStorageUtil.saveFile(any(MultipartFile.class))).thenReturn("unique-new.jpg");
        when(repository.save(any(MarbleImage.class))).thenReturn(marbleImage);
        when(mapper.toResponse(any(MarbleImage.class), anyString())).thenReturn(new MarbleImageResponse());

        MarbleImageResponse response = service.update(1L, new UpdateMarbleImageRequest(), file);

        assertNotNull(response);
        verify(fileStorageUtil, times(1)).deleteFile(anyString()); // Old file deleted
        verify(fileStorageUtil, times(1)).saveFile(any(MultipartFile.class));
    }
}
