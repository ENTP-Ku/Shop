package com.example.demo; // 패키지 선언

import java.time.LocalDateTime; // 날짜 및 시간 처리를 위한 LocalDateTime 클래스 import

import jakarta.persistence.Entity; // JPA Entity 어노테이션 import
import jakarta.persistence.GeneratedValue; // 자동 생성 전략을 위한 어노테이션 import
import jakarta.persistence.GenerationType; // 생성 전략 유형을 정의하기 위한 import
import jakarta.persistence.Id; // 기본 키를 정의하기 위한 어노테이션 import
import jakarta.persistence.Table; // 엔티티와 테이블의 매핑을 위한 어노테이션 import
import lombok.Data; // Lombok의 Data 어노테이션 import (자동으로 getter, setter 등 생성)

@Entity // JPA가 관리하는 엔티티임을 나타냄
@Table(name = "purchases") // 이 엔티티가 매핑될 데이터베이스 테이블 이름을 'purchases'로 설정
@Data // Lombok을 사용하여 getter, setter, toString 등 자동 생성
public class Order {
    @Id // 이 필드가 기본 키임을 나타냄
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 값을 데이터베이스에서 자동 생성하도록 설정
    private Long id; // 주문의 고유 ID

    private Long userId; // 주문한 사용자 ID

    private Long productId; // 주문한 제품 ID

    private LocalDateTime orderDate; // 주문 날짜 및 시간
}
