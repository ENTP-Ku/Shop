package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// Product 엔티티에 대한 데이터 접근을 위한 리포지토리 인터페이스
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // 최근 업로드된 5개의 제품을 조회하는 메소드 (필드명 변경: uploadDate)
    List<Product> findTop5ByOrderByUploadDateDesc();

    // 특정 종류의 제품을 조회하는 메소드
    List<Product> findByKind(String kind);

    // ID로 제품 조회
    Optional<Product> findById(Long id); 
}
