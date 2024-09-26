package com.example.demo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterChatRepository extends JpaRepository<MasterChat, Long> {
    // 추가적인 쿼리 메소드가 필요하면 여기에 정의할 수 있습니다.
}
