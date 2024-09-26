package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/chat") // 이 컨트롤러의 모든 엔드포인트는 /api/chat로 시작
public class MasterChatController {

    @Autowired
    private MasterChatService masterChatService; // MasterChatService를 주입하여 master_chat 관련 기능을 사용
    @Autowired
    private ChatService chatService; // ChatService를 주입하여 chat 관련 기능을 사용

    // POST 요청을 통해 메시지를 전송하는 엔드포인트
    @PostMapping("/messages")
    public void sendMessage(@RequestBody MasterChat masterChat) {
        // 현재 시간을 "yyyy-MM-dd HH:mm:ss" 형식으로 설정
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        
        // 생성된 시간 값을 MasterChat 객체에 설정
        masterChat.setCreatedAt(currentTime);
        
        // 메시지를 데이터베이스에 저장
        masterChatService.saveMessage(masterChat);
    }

    // GET 요청을 통해 특정 사용자의 메시지를 가져오는 엔드포인트
    @GetMapping("/messages/{username}")
    public List<MasterChat> getMessagesByUsername(@PathVariable String username) {
        List<MasterChat> masterChatMessages = masterChatService.getMessagesByUsername(username); // master_chat 테이블에서 메시지 가져오기
        List<Chat> chatMessages = chatService.getMessagesByUsername(username); // chat 테이블에서 메시지 가져오기

        // 두 메시지 목록을 결합
        List<MasterChat> allMessages = new ArrayList<>();
        allMessages.addAll(masterChatMessages);

        // chatMessages를 MasterChat 형태로 변환하고 추가
        for (Chat chatMessage : chatMessages) {
            MasterChat masterChat = new MasterChat();
            masterChat.setUsername(chatMessage.getUsername());
            masterChat.setMessage(chatMessage.getMessage());
            masterChat.setCreatedAt(chatMessage.getCreatedAt()); // Chat 객체에서 createdAt 값을 가져와 설정
            allMessages.add(masterChat);
        }

        // createdAt 기준으로 내림차순 정렬
        allMessages.sort(Comparator.comparing(MasterChat::getCreatedAt).reversed());

        return allMessages; // 모든 메시지 반환
    }
}
