package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class MasterChatListController {

    @Autowired
    private MasterChatListRepository masterChatListRepository;

    @GetMapping("/messages")
    public List<MasterChatList> getChatMessages() {
        return masterChatListRepository.findGroupedChatMessages(); // 그룹화된 메시지 반환
    }

    @PostMapping("/save")
    public MasterChatList saveChatMessage(@RequestBody MasterChatList chatMessage) {
        return masterChatListRepository.save(chatMessage); // 메시지 저장
    }


}
