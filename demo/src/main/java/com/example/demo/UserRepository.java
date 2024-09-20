package com.example.demo; // 패키지 선언

import org.springframework.data.jpa.repository.JpaRepository; // JPA Repository를 위한 import

// User 엔티티에 대한 데이터 액세스를 처리하는 인터페이스
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 사용자 이름으로 사용자 정보를 찾는 메서드
    User findByUsername(String username);
}
