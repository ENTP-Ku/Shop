package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/chat")
public class MasterChatController {

    @Autowired
    private MasterChatService masterChatService;

    @PostMapping("/messages")
    public void sendMessage(@RequestBody MasterChat masterChat) {
        // 현재 시간 설정
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        masterChat.setCreatedAt(currentTime);
        masterChatService.saveMessage(masterChat);
    }
}
