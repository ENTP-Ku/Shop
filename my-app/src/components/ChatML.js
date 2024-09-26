import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 명명된 내보내기로 가져오기

const ChatML = () => {
  const [chats, setChats] = useState([]); // 전체 채팅 목록 상태
  const [error, setError] = useState(null); // 오류 상태

  // 채팅 목록을 가져오는 함수
  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chat/messages"); // API 호출 (적절한 엔드포인트로 수정 필요)
      setChats(response.data); // 채팅 목록 상태 업데이트
    } catch (error) {
      console.error("채팅 목록을 가져오는 중 오류 발생:", error);
      setError("채팅 목록을 가져오는 중 오류가 발생했습니다."); // 오류 상태 업데이트
    }
  };

  // 컴포넌트가 마운트될 때 채팅 목록을 가져옴
  useEffect(() => {
    fetchChats(); // 초기 채팅 목록 가져오기
  }, []);

  return (
    <div>
      <h1>관리자 채팅 목록</h1>
      {error && <p>{error}</p>} {/* 오류 메시지 표시 */}
      <div>
        <ul>
          {/* 채팅 메시지 리스트 표시 */}
          {chats.map((chat, index) => (
            <li key={index}>
              <strong>{chat.username}</strong>: {chat.message}{" "}
              <small>{new Date(chat.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatML;
