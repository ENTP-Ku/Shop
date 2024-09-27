package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위한 Autowired 애너테이션을 import합니다.
import org.springframework.web.bind.annotation.*; // Spring의 RESTful 웹 서비스 관련 애너테이션들을 import합니다.

import java.util.List; // List 인터페이스를 사용하기 위해 import합니다.

// ChatController는 채팅과 관련된 API 요청을 처리하는 REST 컨트롤러입니다.
@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냅니다.
@RequestMapping("/chat") // 모든 엔드포인트의 기본 URL 경로를 "/chat"으로 설정합니다.
@CrossOrigin(origins = "http://localhost:3000") // CORS를 설정하여 특정 오리진(여기서는 http://localhost:3000)에서의 요청을 허용합니다.
public class ChatController {

    @Autowired // Spring이 자동으로 의존성을 주입하도록 지정합니다.
    private ChatService chatService; // ChatService를 사용하여 메시지 관련 로직을 처리합니다.
    
    @Autowired // Spring이 자동으로 의존성을 주입하도록 지정합니다.
    private MasterChatService masterChatService; // MasterChatService를 사용하여 특정 사용자와의 메시지를 처리합니다.

    // 메시지를 저장하는 POST 엔드포인트
    @PostMapping("/send") // "/send" 경로로 POST 요청을 처리하는 메서드
    public Chat sendMessage(@RequestBody Chat chat) {
        // 클라이언트로부터 받은 Chat 객체의 메시지와 사용자 이름을 사용하여 메시지를 저장합니다.
        return chatService.saveMessage(chat.getMessage(), chat.getUsername()); // 저장된 메시지를 반환합니다.
    }

    // 최신 메시지를 저장하는 POST 엔드포인트
    @PostMapping("/save-latest-messages") // "/save-latest-messages" 경로로 POST 요청을 처리하는 메서드
    public void saveLatestMessages() {
        System.out.println("최신 메시지를 저장하는 메서드 호출됨"); // 메서드 호출 로그 출력
        // 최신 메시지를 'lastChat' 테이블에 저장하는 로직을 호출합니다.
        chatService.saveLatestMessagesToLastChat(); // 메서드 이름 변경: 기능에 따라 더 적절한 이름으로 수정
    }
    
    // 특정 사용자와의 모든 메시지를 가져오는 GET 엔드포인트
    @GetMapping("/all-messages") // "/all-messages" 경로로 GET 요청을 처리하는 메서드
    public List<MasterChat> getAllMessagesByUsername(@RequestParam String username) {
        // 주어진 사용자 이름에 해당하는 모든 메시지를 조회하여 반환합니다.
        return masterChatService.getAllMessagesByUsername(username); // 사용자 이름으로 메시지를 조회하여 반환
    }
}
