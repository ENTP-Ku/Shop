package com.example.demo; // 패키지 선언

import java.util.List; // 리스트 자료형을 사용하기 위한 import

import org.springframework.data.jpa.repository.JpaRepository; // JPA 리포지토리 기능을 사용하기 위한 import

// Product 엔티티에 대한 데이터 접근을 위한 리포지토리 인터페이스
public interface ProductRepository extends JpaRepository<Product, Long> {
    // 최근 업로드된 5개의 제품을 조회하는 메소드
    List<Product> findTop5ByOrderByUploadDataDesc();

    // 특정 종류의 제품을 조회하는 메소드
    List<Product> findByKind(String kind);
}
