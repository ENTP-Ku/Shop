package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MasterChatListRepository extends CrudRepository<MasterChatList, Long> {

	@Query("SELECT c FROM MasterChatList c " +
		       "WHERE c.createdAt = (SELECT MAX(c2.createdAt) FROM MasterChatList c2 WHERE c2.toUsername = c.toUsername) " +
		       "ORDER BY c.createdAt DESC")
		List<MasterChatList> findGroupedChatMessages();

    
}



