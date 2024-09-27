package com.example.demo;

import java.util.List; // List 컬렉션을 사용하기 위한 import

import org.springframework.data.jpa.repository.JpaRepository; // JPA를 사용하여 데이터베이스 작업을 위한 인터페이스

// MasterChatRepository는 MasterChat 엔티티와 관련된 데이터베이스 작업을 처리하는 리포지토리 인터페이스입니다.
public interface MasterChatRepository extends JpaRepository<MasterChat, Long> {
    
    // username으로 MasterChat 메시지를 찾는 메서드
    List<MasterChat> findByUsername(String username); // 주어진 username에 해당하는 모든 메시지를 반환
}
