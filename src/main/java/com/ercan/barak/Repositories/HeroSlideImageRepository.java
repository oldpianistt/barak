package com.ercan.barak.Repositories;

import com.ercan.barak.Models.HeroSlideImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSlideImageRepository extends JpaRepository<HeroSlideImage, Long> {

    List<HeroSlideImage> findAllByDeletedFalseOrderByDisplayOrderAsc();

    List<HeroSlideImage> findAllByDeletedFalseAndIsActiveTrueOrderByDisplayOrderAsc();
}
