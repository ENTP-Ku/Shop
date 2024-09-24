package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/create")
    public ChatRoom createChatRoom(@RequestParam Long userId) {
        return chatService.createChatRoom(userId);
    }

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestParam Long chatRoomId, @RequestParam Long senderId, @RequestParam String content) {
        return chatService.sendMessage(chatRoomId, senderId, content);
    }

    @GetMapping("/messages/{chatRoomId}")
    public List<ChatMessage> getMessages(@PathVariable Long chatRoomId) {
        return chatService.getMessages(chatRoomId); // 메시지 조회
    }
}
