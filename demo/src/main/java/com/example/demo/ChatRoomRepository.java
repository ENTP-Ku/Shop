package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 추가적인 쿼리 메소드 작성 가능
    ChatRoom findByUserId(User userId); // 특정 사용자와의 채팅방 찾기
}
