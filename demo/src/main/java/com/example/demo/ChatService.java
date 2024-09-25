package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Chat saveMessage(String message) {
        Chat chat = new Chat(message);
        return chatRepository.save(chat);
    }

    public List<Chat> getAllMessages() {
        return chatRepository.findAll();
    }
}
