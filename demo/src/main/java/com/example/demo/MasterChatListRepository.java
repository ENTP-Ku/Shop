package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MasterChatListRepository extends CrudRepository<MasterChatList, Long> {

    @Query("SELECT c FROM MasterChatList c " +
           "WHERE c.createdAt = (SELECT MAX(c2.createdAt) FROM MasterChatList c2 WHERE c2.username = c.username) " +
           "ORDER BY c.createdAt DESC")
    List<MasterChatList> findGroupedChatMessages();
    
    // 특정 사용자와 관리자의 모든 메시지를 가져오는 쿼리
    @Query("SELECT m FROM MasterChatList m WHERE m.toUsername = :toUsername OR m.username = :username ORDER BY m.createdAt ASC")
    List<MasterChatList> findAllMessagesByUser(@Param("toUsername") String toUsername, @Param("username") String username);
}



