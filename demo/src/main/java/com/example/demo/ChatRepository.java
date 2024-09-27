package com.example.demo;

import org.springframework.data.jpa.repository.Query; // JPA 쿼리를 사용하기 위해 import합니다.
import org.springframework.data.repository.CrudRepository; // CRUD 기능을 제공하는 인터페이스를 import합니다.
import org.springframework.stereotype.Repository; // 이 클래스가 Spring의 Repository임을 나타내기 위해 import합니다.

import java.util.List; // List 인터페이스를 사용하기 위해 import합니다.

@Repository // Spring의 Repository로 등록하여 데이터베이스와의 상호작용을 가능하게 합니다.
public interface ChatRepository extends CrudRepository<Chat, Long> { // CrudRepository를 상속하여 기본 CRUD 기능을 제공합니다.

    // 최신 메시지를 찾기 위한 사용자 정의 쿼리
    @Query("SELECT c FROM Chat c " + // Chat 엔티티에서 c를 선택합니다.
           "WHERE c.createdAt = (SELECT MAX(c2.createdAt) FROM Chat c2 WHERE c2.username = c.username) " + // 각 사용자별 최신 메시지를 찾습니다.
           "ORDER BY c.createdAt DESC") // 최신 메시지가 먼저 오도록 정렬합니다.
    List<Chat> findLatestMessages(); // 최신 메시지를 반환하는 메서드

    // 사용자 이름으로 메시지를 찾는 메서드
    List<Chat> findByUsername(String username); // 주어진 username에 해당하는 모든 메시지를 찾습니다.
}
