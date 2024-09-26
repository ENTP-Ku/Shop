import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatML = () => {
  const [chats, setChats] = useState([]); // 사용자 목록과 최신 메시지

  // 모든 사용자 목록과 최신 메시지를 가져오는 함수
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/chat/messages'); // 사용자 목록을 가져오는 API 호출
      setChats(response.data); // 사용자 목록과 최신 메시지 상태 업데이트
    } catch (error) {
      console.error("사용자 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 사용자 클릭 핸들러
// 사용자 클릭 핸들러
const handleUserClick = (username) => {
  // 새로운 창에서 MChat으로 이동
  window.open(`/mChat?username=${username}`, "_blank", "width=600,height=700,resizable=yes,scrollbars=yes");
};

  // 컴포넌트가 마운트될 때 사용자 목록을 가져옴
  useEffect(() => {
    fetchUsers(); // 사용자 목록 가져오기
  }, []);

  return (
    <div>
      <h1>관리자 채팅 목록</h1>
      <div>
        <ul>
          {/* 사용자 목록과 최신 메시지 표시 */}
          {chats.map((chat) => (
            <li key={chat.username} onClick={() => handleUserClick(chat.username)}>
              <strong>{chat.username}</strong>: {chat.latestMessage} {/* 최신 메시지 표시 */}
              <small>{new Date(chat.createdAt).toLocaleString()}</small> {/* 메시지 시간 표시 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatML;
