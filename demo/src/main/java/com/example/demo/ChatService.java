package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private LastChatRepository lastChatRepository;

    public Chat saveMessage(String message, String username) {
        Chat chat = new Chat(message, username);
        return chatRepository.save(chat);
    }

    public List<Chat> getAllMessages() {
        List<Chat> allMessages = new ArrayList<>();
        chatRepository.findAll().forEach(allMessages::add); // Iterable을 List로 변환
        return allMessages;
    }

    @Transactional
    public void saveLatestMessagesToLastChat() {
        List<Chat> latestMessages = chatRepository.findLatestMessages(); 
        
        for (Chat chat : latestMessages) {
            LastChat lastChat = LastChat.builder()
                .username(chat.getUsername())
                .message(chat.getMessage())
                .createdAt(chat.getCreatedAt())
                .build();
            lastChatRepository.save(lastChat);
            System.out.println("저장된 메시지: " + lastChat); // 확인용 출력

        }
    }
}
