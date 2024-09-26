package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LastChatRepository extends JpaRepository<LastChat, Long> {
    // username으로 LastChat을 찾는 메서드
    LastChat findByUsername(String username);
    List<LastChat> findAllByOrderByCreatedAtDesc();

}
