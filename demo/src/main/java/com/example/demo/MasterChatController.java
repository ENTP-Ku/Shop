package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.web.bind.annotation.*; // RESTful API를 위한 애너테이션 import

import java.time.LocalDateTime; // 날짜 및 시간 처리를 위한 import
import java.time.format.DateTimeFormatter; // 날짜 및 시간 형식화를 위한 import
import java.util.List; // List 컬렉션을 사용하기 위한 import

// MasterChatController는 채팅 메시지와 관련된 API 요청을 처리하는 REST 컨트롤러입니다.
@RestController
@RequestMapping("/api/chat") // 모든 엔드포인트의 기본 URL 경로를 "/api/chat"으로 설정합니다.
public class MasterChatController {

    @Autowired // Spring이 자동으로 의존성을 주입하도록 지정합니다.
    private MasterChatService masterChatService; // MasterChatService를 사용하여 메시지 관련 로직을 처리합니다.

    // POST 요청을 통해 메시지를 전송하는 엔드포인트
    @PostMapping("/messages") 
    public void sendMessage(@RequestBody MasterChat masterChat) {
        // 현재 시간을 "yyyy-MM-dd HH:mm:ss" 형식으로 설정
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        masterChat.setCreatedAt(currentTime); // 생성된 시간 값을 MasterChat 객체에 설정

        masterChatService.saveMessage(masterChat); // 메시지를 저장하는 서비스 메서드 호출
    }

    // GET 요청을 통해 특정 사용자의 메시지를 가져오는 엔드포인트
    @GetMapping("/messages/{username}") 
    public List<MasterChat> getMessagesByUsername(@PathVariable String username) {
        // 서비스에서 모든 메시지를 가져오는 메서드를 호출하여 반환
        return masterChatService.getAllMessagesByUsername(username);
    }
}
