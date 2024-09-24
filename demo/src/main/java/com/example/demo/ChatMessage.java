package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 메시지 ID

    @ManyToOne
    @JoinColumn(name = "chat_room_id") // 외래 키 설정
    private ChatRoom chatRoom; // 연결된 채팅방

    private Long senderId; // 메시지를 보낸 사용자 ID
    private String content; // 메시지 내용
    private String timestamp; // 메시지 전송 시간
}
