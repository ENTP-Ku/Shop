package com.example.demo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterChatRepository extends JpaRepository<MasterChat, Long> {
    List<MasterChat> findByUsername(String username); // username으로 메시지를 찾는 메서드
}
