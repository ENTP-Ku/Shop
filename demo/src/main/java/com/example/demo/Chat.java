package com.example.demo;

import java.time.LocalDateTime; // LocalDateTime 클래스를 import하여 날짜와 시간을 다룹니다.

import jakarta.persistence.Column; // JPA의 Column 애너테이션을 import합니다.
import jakarta.persistence.Entity; // JPA의 Entity 애너테이션을 import합니다.
import jakarta.persistence.GeneratedValue; // JPA의 GeneratedValue 애너테이션을 import합니다.
import jakarta.persistence.GenerationType; // JPA의 GenerationType 애너테이션을 import합니다.
import jakarta.persistence.Id; // JPA의 Id 애너테이션을 import합니다.
import lombok.Getter; // Lombok의 Getter 애너테이션을 import합니다.
import lombok.NoArgsConstructor; // Lombok의 NoArgsConstructor 애너테이션을 import합니다.
import lombok.AllArgsConstructor; // Lombok의 AllArgsConstructor 애너테이션을 import합니다.
import lombok.Setter; // Lombok의 Setter 애너테이션을 import합니다.

@Entity // 이 클래스가 JPA의 엔티티임을 나타냅니다.
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자를 자동 생성합니다.
public class Chat {

    @Id // 이 필드가 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 값 자동 생성 전략을 설정합니다.
    private Long id; // 채팅 메시지의 고유 ID

    @Column(nullable = false) // 이 필드는 null 값이 허용되지 않음을 나타냅니다.
    private String message; // 채팅 메시지 내용

    @Column(nullable = false) // 이 필드는 null 값이 허용되지 않음을 나타냅니다.
    private String username; // 사용자 이름 필드 추가

    private LocalDateTime createdAt; // 메시지가 생성된 날짜와 시간

    // 기존 생성자: 메시지와 사용자 이름을 매개변수로 받아 객체를 초기화합니다.
    public Chat(String message, String username) {
        this.message = message; // 채팅 메시지 초기화
        this.username = username; // 사용자 이름 초기화
        this.createdAt = LocalDateTime.now(); // 현재 시간으로 생성 시간 초기화
    }
}
