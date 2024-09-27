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
            // 기존 LastChat 찾기
            LastChat existingChat = lastChatRepository.findByUsername(chat.getUsername());
            
            if (existingChat != null) {
                // 기존 메시지가 있으면 업데이트
                existingChat.setMessage(chat.getMessage());
                existingChat.setCreatedAt(chat.getCreatedAt());
                lastChatRepository.save(existingChat);
                System.out.println("업데이트된 메시지: " + existingChat); // 확인용 출력
            } else {
                // 기존 메시지가 없으면 새로 추가
                LastChat newChat = LastChat.builder()
                    .username(chat.getUsername())
                    .message(chat.getMessage())
                    .createdAt(chat.getCreatedAt())
                    .build();
                lastChatRepository.save(newChat);
                System.out.println("저장된 메시지: " + newChat); // 확인용 출력
            }
        }
    }
    
    // 특정 사용자의 메시지를 가져오는 메서드
    public List<Chat> getMessagesByUsername(String username) {
        return chatRepository.findByUsername(username); // 주어진 username으로 메시지를 찾음
    }


}
