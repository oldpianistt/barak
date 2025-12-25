package com.ercan.barak.Controllers;

import com.ercan.barak.Services.MarbleImageService;
import com.ercan.barak.Controllers.Requests.CreateMarbleImageRequest;
import com.ercan.barak.Controllers.Responses.MarbleImageResponse;
import com.ercan.barak.Controllers.Responses.PageResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MarbleImageControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @MockBean
        private MarbleImageService service;

        @Test
        void create_ShouldReturnCreated() throws Exception {
                CreateMarbleImageRequest request = new CreateMarbleImageRequest();
                request.setTitle("Test Marble");
                request.setOrderIndex(0);

                MockMultipartFile requestPart = new MockMultipartFile(
                                "request",
                                "",
                                "application/json",
                                objectMapper.writeValueAsString(request).getBytes(StandardCharsets.UTF_8));

                MockMultipartFile filePart = new MockMultipartFile(
                                "imageFile",
                                "test.jpg",
                                "image/jpeg",
                                "content".getBytes());

                when(service.create(any(), any())).thenReturn(new MarbleImageResponse());

                mockMvc.perform(multipart("/api/admin/marble-images")
                                .file(filePart)
                                .file(requestPart)
                                .contentType(MediaType.MULTIPART_FORM_DATA))
                                .andExpect(status().isCreated());
        }

        @Test
        void list_ShouldReturnOk() throws Exception {
                when(service.list(anyInt(), anyInt(), any())).thenReturn(new PageResponse<>());

                mockMvc.perform(get("/api/admin/marble-images"))
                                .andExpect(status().isOk());
        }
}
