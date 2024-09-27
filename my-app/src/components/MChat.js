import React, { useState, useEffect } from "react";
import axios from "axios";

const MChat = () => {
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [inputMessage, setInputMessage] = useState(""); // 입력 메시지 상태
  const username = new URLSearchParams(window.location.search).get("username"); // URL에서 username 추출

  // 특정 사용자와의 메시지를 가져오는 함수
  const fetchMessages = async () => {
    if (username) {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${username}`); // Base URL 추가
        setMessages(response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))); // 오름차순 정렬
      } catch (error) {
        console.error("메시지를 가져오는 중 오류 발생:", error);
        alert("메시지를 가져오는 데 오류가 발생했습니다."); // 사용자에게 오류 알림
      }
    }
  };

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return; // 빈 메시지 전송 방지

    const formattedMessage = { username: username, message: `master: ${inputMessage}` }; // 메시지에 'master' 접두사 추가

    // 데이터베이스에 메시지 저장
    try {
      await axios.post(`http://localhost:8080/api/chat/messages`, formattedMessage); // DB에 메시지 저장
      fetchMessages(); // 메시지를 다시 가져오기
    } catch (error) {
      console.error("메시지 저장 중 오류 발생:", error);
      alert("메시지 저장에 실패했습니다."); // 오류 알림
    }

    setInputMessage(""); // 입력창 비우기
  };

  useEffect(() => {
    fetchMessages(); // 메시지 가져오기
  }, [username]);

  return (
    <div>
      <h2>{username}와의 대화</h2>
      <ul>
        {messages.map((msg, index) => ( // 정렬된 메시지 목록 표시
          <li key={index}>
            {msg.message}{" "}
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)} // 입력값 변경 시 상태 업데이트
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSendMessage}>전송</button> {/* 메시지 전송 버튼 */}
    </div>
  );
};

export default MChat;
