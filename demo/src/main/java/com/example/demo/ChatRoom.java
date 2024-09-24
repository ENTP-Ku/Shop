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
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 채팅방 ID

    @ManyToOne // 사용자와 다대일 관계 설정
    @JoinColumn(name = "user_id") // 외래 키 설정
    private User user; // 고객 정보, 필드 이름을 user로 변경

    // 관리자는 하나로 고정, 필드로 설정할 필요 없음
    private Long adminId; // 관리자의 ID

    private String createdAt; // 생성 날짜 및 시간
}
