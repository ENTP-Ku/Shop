package com.example.demo; // 패키지 선언

import java.util.List; // 리스트 자료형을 사용하기 위한 import

import org.springframework.data.jpa.repository.JpaRepository; // JPA Repository 기능을 사용하기 위한 import

// Post 엔티티에 대한 데이터 액세스를 제공하는 인터페이스
public interface PostRepository extends JpaRepository<Post, Long> {
    // 모든 게시글을 조회하는 메소드 (JpaRepository에서 기본 제공)
    List<Post> findAll();
}
