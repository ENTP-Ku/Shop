package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class LastChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private LastChatRepository lastChatRepository;

    @Transactional
    public void saveLatestMessagesToLastChat() {
        List<Chat> latestMessages = chatRepository.findLatestMessages();

        for (Chat chat : latestMessages) {
            LastChat lastChat = LastChat.builder()
                .username(chat.getUsername()) // 필드 이름 변경
                .message(chat.getMessage())
                .createdAt(chat.getCreatedAt())
                .build();
            lastChatRepository.save(lastChat);
        }
    }
}
