package com.example.demo; // 패키지 선언

import java.util.List; // 리스트 자료형을 사용하기 위한 import
import java.util.Optional; // Optional 클래스를 사용하기 위한 import
import org.springframework.lang.NonNull;


import org.springframework.data.jpa.repository.JpaRepository; // JPA Repository 기능을 사용하기 위한 import

// Product 엔티티에 대한 데이터 접근을 위한 리포지토리 인터페이스
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // 최근 업로드된 5개의 제품을 조회하는 메소드
    List<Product> findTop5ByOrderByUploadDateDesc(); // uploadDate 필드를 기준으로 내림차순 정렬하여 5개의 제품 반환

    // 특정 종류의 제품을 조회하는 메소드
    List<Product> findByKind(String kind); // 주어진 종류의 제품 목록 반환

    // ID로 제품 조회
    @NonNull
    Optional<Product> findById(@NonNull Long id); // ID로 제품을 조회하고, 존재하지 않을 경우 Optional로 반환
}
