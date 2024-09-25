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
    public Chat sendMessage(@RequestBody String message) {
        return chatService.saveMessage(message);
    }

    @GetMapping("/messages")
    public List<Chat> getMessages() {
        return chatService.getAllMessages();
    }
}
