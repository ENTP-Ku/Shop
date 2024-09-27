package com.example.demo;

import java.util.ArrayList; // ArrayList를 사용하기 위해 import합니다.
import java.util.List; // List 인터페이스를 사용하기 위해 import합니다.

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위한 @Autowired 어노테이션을 사용하기 위해 import합니다.
import org.springframework.stereotype.Service; // 이 클래스가 서비스 역할을 수행함을 나타내기 위해 import합니다.

import jakarta.transaction.Transactional; // 트랜잭션 관리를 위한 @Transactional 어노테이션을 사용하기 위해 import합니다.

@Service // 이 클래스가 Spring의 서비스 컴포넌트임을 나타냅니다.
public class ChatService {

    @Autowired // Spring이 자동으로 의존성을 주입하도록 지정합니다.
    private ChatRepository chatRepository; // ChatRepository를 사용하여 채팅 메시지 관련 데이터 작업을 처리합니다.

    @Autowired // Spring이 자동으로 의존성을 주입하도록 지정합니다.
    private LastChatRepository lastChatRepository; // LastChatRepository를 사용하여 최신 메시지 관련 데이터 작업을 처리합니다.

    // 메시지를 저장하는 메서드
    public Chat saveMessage(String message, String username) {
        Chat chat = new Chat(message, username); // 새로운 Chat 객체를 생성합니다.
        return chatRepository.save(chat); // 채팅 메시지를 데이터베이스에 저장하고 반환합니다.
    }

    // 모든 메시지를 가져오는 메서드
    public List<Chat> getAllMessages() {
        List<Chat> allMessages = new ArrayList<>(); // 모든 메시지를 저장할 리스트 초기화
        chatRepository.findAll().forEach(allMessages::add); // Iterable을 List로 변환하여 모든 메시지를 추가합니다.
        return allMessages; // 모든 메시지를 반환합니다.
    }

    // 최신 메시지를 'lastChat' 테이블에 저장하는 메서드
    @Transactional // 이 메서드가 트랜잭션을 관리하도록 지정합니다.
    public void saveLatestMessagesToLastChat() {
        List<Chat> latestMessages = chatRepository.findLatestMessages(); // 최신 메시지를 가져옵니다.

        for (Chat chat : latestMessages) {
            // 기존 LastChat 찾기
            LastChat existingChat = lastChatRepository.findByUsername(chat.getUsername()); // 주어진 username으로 기존 메시지를 찾습니다.
            
            if (existingChat != null) {
                // 기존 메시지가 있으면 업데이트
                existingChat.setMessage(chat.getMessage()); // 메시지 업데이트
                existingChat.setCreatedAt(chat.getCreatedAt()); // 생성일 업데이트
                lastChatRepository.save(existingChat); // 업데이트된 메시지를 저장합니다.
                System.out.println("업데이트된 메시지: " + existingChat); // 확인용 출력
            } else {
                // 기존 메시지가 없으면 새로 추가
                LastChat newChat = LastChat.builder() // LastChat 객체를 빌더 패턴을 사용하여 생성합니다.
                    .username(chat.getUsername()) // 사용자 이름 설정
                    .message(chat.getMessage()) // 메시지 설정
                    .createdAt(chat.getCreatedAt()) // 생성일 설정
                    .build(); // 객체 생성
                lastChatRepository.save(newChat); // 새로운 메시지를 데이터베이스에 저장합니다.
                System.out.println("저장된 메시지: " + newChat); // 확인용 출력
            }
        }
    }
    
    // 특정 사용자의 메시지를 가져오는 메서드
    public List<Chat> getMessagesByUsername(String username) {
        return chatRepository.findByUsername(username); // 주어진 username으로 메시지를 찾고 반환합니다.
    }
}
