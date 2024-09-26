package com.example.demo;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterChatService {

    @Autowired
    private MasterChatRepository masterChatRepository;

    public MasterChat saveMessage(MasterChat masterChat) {
        return masterChatRepository.save(masterChat);
    }

    // 특정 사용자의 메시지를 가져오는 메서드
    public List<MasterChat> getMessagesByUsername(String username) {
        return masterChatRepository.findByUsername(username); // 주어진 username으로 메시지를 찾음
    }

    
    
}
