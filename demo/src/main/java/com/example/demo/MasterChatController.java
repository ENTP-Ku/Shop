package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class MasterChatController {

    @Autowired
    private MasterChatService masterChatService;

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
