package com.example.demo;

import java.util.List; // List 클래스를 사용하기 위해 import합니다.

import org.springframework.data.jpa.repository.JpaRepository; // JPA를 사용하여 데이터베이스 작업을 처리하기 위한 기본 레포지토리 인터페이스를 import합니다.

// LastChatRepository는 LastChat 엔티티에 대한 데이터베이스 작업을 수행하는 레포지토리입니다.
public interface LastChatRepository extends JpaRepository<LastChat, Long> { // JpaRepository를 상속받아 기본적인 CRUD 메서드를 제공합니다.

    // username으로 LastChat을 찾는 메서드
    LastChat findByUsername(String username); // 주어진 username에 해당하는 LastChat을 찾는 메서드

    // CreatedAt 기준으로 정렬하여 모든 LastChat을 가져오는 메서드
    List<LastChat> findAllByOrderByCreatedAtDesc(); // 모든 LastChat 레코드를 createdAt 필드 기준으로 내림차순 정렬하여 반환하는 메서드
}
