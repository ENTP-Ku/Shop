package com.example.demo;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterChatService {

    @Autowired
    private MasterChatRepository masterChatRepository;

    @Autowired
    private ChatService chatService;

    // 메시지 저장 메서드
    public MasterChat saveMessage(MasterChat masterChat) {
        return masterChatRepository.save(masterChat);
    }

    // 특정 사용자의 모든 메시지(master_chat과 chat) 가져오는 메서드
    public List<MasterChat> getAllMessagesByUsername(String username) {
        List<MasterChat> masterChatMessages = masterChatRepository.findByUsername(username); // master_chat 테이블에서 메시지 가져오기
        List<Chat> chatMessages = chatService.getMessagesByUsername(username); // chat 테이블에서 메시지 가져오기

        // 두 메시지 목록을 결합
        List<MasterChat> allMessages = new ArrayList<>();
        allMessages.addAll(masterChatMessages);

        // chatMessages를 MasterChat 형태로 변환하고 추가
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Chat chatMessage : chatMessages) {
            MasterChat masterChat = new MasterChat();
            masterChat.setUsername(chatMessage.getUsername());
            masterChat.setMessage(chatMessage.getMessage());

            // LocalDateTime을 String으로 변환하여 설정
            String formattedCreatedAt = chatMessage.getCreatedAt().format(formatter);
            masterChat.setCreatedAt(formattedCreatedAt);

            allMessages.add(masterChat);
        }

        // createdAt 기준으로 내림차순 정렬
        allMessages.sort(Comparator.comparing(MasterChat::getCreatedAt).reversed());

        return allMessages;
    }
}
