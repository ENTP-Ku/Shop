package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class LastChatController {

    @Autowired
    private LastChatRepository lastChatRepository;

    // LastChat 테이블의 모든 레코드를 가져오는 메서드
    @GetMapping("/messages")
    public List<LastChat> getLastChats() {
        // LastChat 테이블에서 모든 레코드를 날짜 내림차순으로 가져오기
        return lastChatRepository.findAllByOrderByCreatedAtDesc();
    }
}
