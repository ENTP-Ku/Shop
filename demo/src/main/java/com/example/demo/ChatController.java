package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat") 
@CrossOrigin(origins = "http://localhost:3000") 
public class ChatController {

    @Autowired 
    private ChatService chatService;

    @PostMapping("/send") 
    public Chat sendMessage(@RequestBody Chat chat) {
        return chatService.saveMessage(chat.getMessage(), chat.getUsername());
    }

    @GetMapping("/messages") 
    public List<Chat> getMessages() {
        return chatService.getAllMessages();
    }
    
    @PostMapping("/save-latest-messages") 
    public void saveLatestMessages() {
        System.out.println("최신 메시지를 저장하는 메서드 호출됨");

        chatService.saveLatestMessagesToLastChat(); // 메서드 이름 변경
    }
}
