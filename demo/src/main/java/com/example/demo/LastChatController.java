package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class LastChatController {

    @Autowired
    private LastChatRepository lastChatRepository;

    @GetMapping("/messages")
    public List<LastChat> getLastChats() {
        // Iterable을 List로 변환
        List<LastChat> lastChats = new ArrayList<>();
        lastChatRepository.findAll().forEach(lastChats::add); // Iterable을 List로 추가
        return lastChats; // List 반환
    }
}
