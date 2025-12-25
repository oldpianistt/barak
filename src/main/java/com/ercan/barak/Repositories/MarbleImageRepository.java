package com.ercan.barak.Repositories;

import com.ercan.barak.Models.MarbleImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarbleImageRepository extends JpaRepository<MarbleImage, Long> {

    Page<MarbleImage> findAllByDeletedFalse(Pageable pageable);

    Page<MarbleImage> findAllByDeletedFalseAndIsVisibleTrue(Pageable pageable);
}
