package com.example.demo;

import com.example.demo.ChatRoom;
import com.example.demo.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Autowired
    private UserService userService; // UserService를 주입받습니다.


    private static final Long ADMIN_ID = 1L; // 고정된 관리자의 ID (1명만 존재)

    public ChatRoom createChatRoom(Long userId) {
        ChatRoom chatRoom = new ChatRoom();
        User user = userService.findById(userId); // 사용자 ID로 User 객체를 가져오기
        chatRoom.setUser(user); // User 객체를 설정
        chatRoom.setAdminId(ADMIN_ID); // 관리자 ID 설정
        chatRoom.setCreatedAt(LocalDateTime.now().toString());
        return chatRoomRepository.save(chatRoom);
    }

    public ChatMessage sendMessage(Long chatRoomId, Long senderId, String content) {
        ChatMessage message = new ChatMessage();
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElse(null);
        message.setChatRoom(chatRoom); // 연결된 채팅방 설정
        message.setSenderId(senderId);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now().toString());
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getMessages(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId); // 해당 채팅방의 메시지 조회
    }
}
