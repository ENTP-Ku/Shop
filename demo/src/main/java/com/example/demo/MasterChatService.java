package com.example.demo;

import java.time.format.DateTimeFormatter; // 날짜 및 시간 포맷팅을 위한 클래스
import java.util.ArrayList; // 배열 리스트를 사용하기 위한 클래스
import java.util.Comparator; // 정렬을 위한 Comparator 인터페이스
import java.util.List; // 리스트 컬렉션을 사용하기 위한 클래스
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션
import org.springframework.stereotype.Service; // 서비스 계층을 정의하기 위한 어노테이션

// MasterChatService는 채팅 메시지를 처리하는 비즈니스 로직을 구현하는 서비스 클래스입니다.
@Service
public class MasterChatService {

    @Autowired
    private MasterChatRepository masterChatRepository; // MasterChat 리포지토리 의존성 주입

    @Autowired
    private ChatService chatService; // ChatService 의존성 주입

    // 메시지를 저장하는 메서드
    public MasterChat saveMessage(MasterChat masterChat) {
        return masterChatRepository.save(masterChat); // MasterChat 객체를 데이터베이스에 저장
    }

    // 특정 사용자의 모든 메시지(master_chat과 chat) 가져오는 메서드
    public List<MasterChat> getAllMessagesByUsername(String username) {
        // master_chat 테이블에서 사용자에 해당하는 모든 메시지를 가져옵니다.
        List<MasterChat> masterChatMessages = masterChatRepository.findByUsername(username); 
        
        // chat 테이블에서 사용자에 해당하는 모든 메시지를 가져옵니다.
        List<Chat> chatMessages = chatService.getMessagesByUsername(username); 

        // 두 메시지 목록을 결합합니다.
        List<MasterChat> allMessages = new ArrayList<>();
        allMessages.addAll(masterChatMessages); // masterChatMessages를 allMessages에 추가

        // chatMessages를 MasterChat 형태로 변환하여 추가합니다.
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); // 날짜 포맷 정의
        for (Chat chatMessage : chatMessages) {
            MasterChat masterChat = new MasterChat();
            masterChat.setUsername(chatMessage.getUsername()); // 사용자 이름 설정
            masterChat.setMessage(chatMessage.getMessage()); // 메시지 설정

            // LocalDateTime을 String으로 변환하여 설정
            String formattedCreatedAt = chatMessage.getCreatedAt().format(formatter); 
            masterChat.setCreatedAt(formattedCreatedAt); // 생성 시간 설정

            allMessages.add(masterChat); // 변환된 MasterChat 객체를 allMessages에 추가
        }

        // createdAt 기준으로 내림차순 정렬
        allMessages.sort(Comparator.comparing(MasterChat::getCreatedAt).reversed()); // 정렬 후 반환

        return allMessages; // 모든 메시지 반환
    }
}
