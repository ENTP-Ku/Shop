package com.example.demo;

import jakarta.persistence.*; // JPA 관련 어노테이션을 사용하기 위해 import합니다.
import lombok.AllArgsConstructor; // 모든 필드를 인자로 받는 생성자를 자동 생성하기 위해 import합니다.
import lombok.Builder; // 빌더 패턴을 사용하기 위해 import합니다.
import lombok.Data; // getter, setter, toString, equals, hashCode 메서드를 자동 생성하기 위해 import합니다.
import lombok.NoArgsConstructor; // 기본 생성자를 자동 생성하기 위해 import합니다.
import java.time.LocalDateTime; // 날짜와 시간을 처리하기 위해 import합니다.

@Entity // 이 클래스가 JPA의 엔티티임을 나타냅니다.
@Table(name = "lastchat") // 이 엔티티가 매핑될 테이블 이름을 "lastchat"으로 설정합니다.
@Data // 모든 필드에 대한 getter, setter 및 toString, equals, hashCode 메서드를 자동 생성합니다.
@Builder // 빌더 패턴을 사용하여 객체를 생성할 수 있도록 합니다.
@NoArgsConstructor // 기본 생성자를 생성합니다.
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자를 생성합니다.
public class LastChat {

    @Id // 이 필드가 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키의 값을 자동으로 생성하는 전략을 설정합니다.
    private Long id; // 고유 식별자

    private String username; // 메시지를 보낸 사용자 이름

    private String message; // 사용자가 보낸 메시지 내용

    @Column(name = "created_at") // 데이터베이스의 열 이름을 "created_at"으로 설정합니다.
    private LocalDateTime createdAt; // 메시지가 생성된 날짜와 시간
}
