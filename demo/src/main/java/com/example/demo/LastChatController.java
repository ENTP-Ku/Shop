package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위해 import합니다.
import org.springframework.web.bind.annotation.GetMapping; // HTTP GET 요청을 처리하기 위해 import합니다.
import org.springframework.web.bind.annotation.RequestMapping; // 요청 경로를 설정하기 위해 import합니다.
import org.springframework.web.bind.annotation.RestController; // RESTful 웹 서비스 컨트롤러임을 나타내기 위해 import합니다.

import java.util.List; // List 클래스를 사용하기 위해 import합니다.

@RestController // 이 클래스가 REST API의 엔드포인트를 처리하는 컨트롤러임을 나타냅니다.
@RequestMapping("/api/chat") // 이 컨트롤러의 기본 URL 경로를 "/api/chat"으로 설정합니다.
public class LastChatController {

    @Autowired // Spring이 자동으로 LastChatRepository를 주입하도록 지정합니다.
    private LastChatRepository lastChatRepository; // LastChat 테이블에 대한 데이터베이스 작업을 처리하는 레포지토리

    // LastChat 테이블의 모든 레코드를 가져오는 메서드
    @GetMapping("/messages") // "/api/chat/messages" 경로에 대한 GET 요청을 처리합니다.
    public List<LastChat> getLastChats() {
        // LastChat 테이블에서 모든 레코드를 날짜 내림차순으로 가져오기
        return lastChatRepository.findAllByOrderByCreatedAtDesc(); // 최근 메시지 순으로 정렬된 레코드 목록을 반환합니다.
    }
}
