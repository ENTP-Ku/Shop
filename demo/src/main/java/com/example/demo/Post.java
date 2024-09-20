package com.example.demo; // 패키지 선언

import java.time.LocalDateTime; // 날짜와 시간을 다루기 위한 클래스 import

import jakarta.persistence.Entity; // JPA 엔티티 클래스를 나타내는 어노테이션 import
import jakarta.persistence.GeneratedValue; // 자동 생성된 값을 지정하기 위한 어노테이션 import
import jakarta.persistence.GenerationType; // 생성 전략을 정의하기 위한 enum import
import jakarta.persistence.Id; // 엔티티의 식별자를 나타내는 어노테이션 import
import lombok.Data; // 자동으로 getter, setter, toString 등을 생성해주는 라이브러리 import

// 게시글을 나타내는 JPA 엔티티 클래스
@Entity // JPA가 이 클래스를 엔티티로 인식하게 함
@Data // Lombok을 사용하여 자동으로 getter, setter, equals, hashCode, toString 메소드를 생성
public class Post {
	
	@Id // 이 필드가 엔티티의 식별자임을 나타냄
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 전략으로 ID 값을 생성
	private Long id; // 게시글 ID

	private String postTitle; // 게시글 제목
	private String postDetail; // 게시글 내용
	private String postId; // 작성자의 사용자 ID
	private LocalDateTime postData; // 게시글 작성 날짜 및 시간
}
