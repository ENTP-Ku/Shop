package com.example.demo;

import jakarta.persistence.Entity; // JPA 엔티티를 정의하기 위한 import
import jakarta.persistence.GeneratedValue; // 자동 생성된 ID를 사용하기 위한 import
import jakarta.persistence.GenerationType; // ID 생성 전략을 설정하기 위한 import
import jakarta.persistence.Id; // ID 필드를 정의하기 위한 import
import lombok.Data; // Lombok의 @Data 애너테이션을 사용하여 getter, setter, toString 등을 자동 생성하기 위한 import

// MasterChat은 채팅 메시지를 저장하기 위한 JPA 엔티티입니다.
@Entity
@Data // Lombok을 사용하여 자동으로 getter, setter, toString, equals 및 hashCode 메서드를 생성합니다.
public class MasterChat {
    
    @Id // 이 필드가 엔티티의 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키의 값을 데이터베이스에서 자동 생성하도록 설정합니다.
    private Long id; // 채팅 메시지의 고유 ID

    private String username; // 메시지를 보낸 사용자의 이름
    private String message; // 채팅 메시지 내용
    private String createdAt; // 메시지가 생성된 시간

    // 기본 생성자 추가
    public MasterChat() {} // 기본 생성자는 JPA에서 필요합니다.
}
