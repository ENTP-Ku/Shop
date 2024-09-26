import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatML = () => {
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자
  const [messages, setMessages] = useState([]); // 메시지 목록

  // 특정 사용자와의 메시지를 가져오는 함수
  const fetchMessages = async (username) => {
    try {
      const response = await axios.get(`/api/chat/messages/${username}`);
      setMessages(response.data); // 메시지 목록 상태 업데이트
    } catch (error) {
      console.error("메시지를 가져오는 중 오류 발생:", error);
    }
  };

  // 사용자 클릭 핸들러
  const handleUserClick = (username) => {
    setSelectedUser(username); // 선택된 사용자 설정
    fetchMessages(username); // 선택된 사용자와의 메시지 가져오기
  };

  return (
    <div>
      <h1>관리자 채팅 목록</h1>
      <div>
        <ul>
          {/* 사용자 목록 표시 (예시로 하드코딩된 사용자 목록 사용) */}
          {["user1", "user2", "user3"].map((user) => (
            <li key={user} onClick={() => handleUserClick(user)}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>{selectedUser}와의 대화</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.toUsername}</strong>: {msg.message}{" "}
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatML;
