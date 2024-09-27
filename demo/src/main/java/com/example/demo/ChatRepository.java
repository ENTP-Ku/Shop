package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends CrudRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c " +
           "WHERE c.createdAt = (SELECT MAX(c2.createdAt) FROM Chat c2 WHERE c2.username = c.username) " +
           "ORDER BY c.createdAt DESC")
    List<Chat> findLatestMessages();
    List<Chat> findByUsername(String username); // username으로 메시지를 찾는 메서드


}
