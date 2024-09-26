package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterChatService {

    @Autowired
    private MasterChatRepository masterChatRepository;

    public MasterChat saveMessage(MasterChat masterChat) {
        return masterChatRepository.save(masterChat);
    }
}
