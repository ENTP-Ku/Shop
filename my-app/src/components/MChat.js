import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // socket.io-client import

const socket = io("http://localhost:4000"); // 소켓 서버에 연결

const MChat = () => {
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [inputMessage, setInputMessage] = useState(""); // 입력 메시지 상태
  const username = new URLSearchParams(window.location.search).get("username"); // URL에서 username 추출

  // 특정 사용자와의 메시지를 가져오는 함수
  const fetchMessages = async () => {
    if (username) {
      try {
        const response = await axios.get(`/api/chat/messages/${username}`);
        setMessages(response.data); // 메시지 목록 상태 업데이트
      } catch (error) {
        console.error("메시지를 가져오는 중 오류 발생:", error);
      }
    }
  };

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return; // 빈 메시지 전송 방지

    const formattedMessage = `master: ${inputMessage}`; // 접두사를 추가하여 메시지 포맷팅

    // 소켓을 통해 메시지를 전송
    socket.emit("chat message", {
      username: username,
      message: formattedMessage,
    });

    // 메시지 전송 후 입력창 비우기
    setInputMessage("");
  };

  useEffect(() => {
    fetchMessages(); // 메시지 가져오기

    // 소켓에서 채팅 메시지를 수신
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]); // 수신한 메시지를 상태에 추가
    });

    return () => {
      socket.off("chat message"); // 언마운트 시 이벤트 제거
    };
  }, [username]);

  return (
    <div>
      <h2>{username}와의 대화</h2>
      <ul>
        {messages.map((msg, index) => (
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
