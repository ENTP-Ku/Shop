package com.example.demo; // 패키지 선언

import java.util.List; // List 컬렉션 사용을 위한 import

import org.springframework.data.jpa.repository.JpaRepository; // Spring Data JPA의 JpaRepository 인터페이스 import

// Order 엔티티를 위한 JPA 리포지토리 인터페이스
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // 사용자 ID에 따라 주문 목록을 찾기 위한 메소드 선언
    List<Order> findByUserId(Long userId);
}
