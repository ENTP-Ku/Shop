import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 명명된 내보내기로 가져오기

// 서버와의 연결 설정 (4000번 포트로 연결)
const socket = io("http://localhost:4000");

const Chat = () => {
  const [message, setMessage] = useState(""); // 입력된 메시지 상태
  const [chat, setChat] = useState([]); // 전체 채팅 메시지 상태

  // JWT 토큰에서 username 추출
  const token = localStorage.getItem("jwt"); // JWT가 로컬 스토리지에 저장되어 있다고 가정
  const username = token ? jwtDecode(token).username : "익명"; // username 추출 (없으면 '익명' 사용)

  // 채팅 목록을 가져오는 함수
  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/all-messages?username=${username}`); // URL 수정
      // 현재 사용자와 동일한 username을 가진 메시지만 필터링
      const filteredChats = response.data.filter((msg) => msg.username === username);
      setChat(filteredChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))); // 시간 오름차순으로 정렬하여 상태 업데이트
    } catch (error) {
      console.error("채팅을 가져오는 중 오류 발생:", error);
    }
  };

  // 컴포넌트가 마운트될 때 채팅 목록을 가져옴
  useEffect(() => {
    fetchChats(); // 초기 채팅 목록 가져오기

    // 소켓에서 채팅 메시지를 수신
    socket.on("chat message", (msg) => {
      // 수신한 메시지를 객체로 변환하여 username 필드 추가
      const [user, message] = msg.split(": "); // 메시지를 user와 message로 분리
      if (user === username) {
        const newMessage = { message, username: user, createdAt: new Date() };
        setChat((prevChat) => {
          const updatedChat = [...prevChat, newMessage];
          return updatedChat.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // 시간 오름차순으로 정렬
        });
      }
    });

    return () => {
      socket.off("chat message"); // 언마운트 시 이벤트 제거
    };
  }, [username]); // username이 변경되면 효과 재실행

  // 메시지 전송 핸들러
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const formattedMessage = {
        message: `${username}: ${message}`, // username 접두사 추가
        username: username,
      };

      socket.emit("chat message", `${username}: ${message}`);

      axios
        .post("http://localhost:8080/chat/send", formattedMessage) // URL 수정
        .then((response) => {
          console.log("메시지가 저장되었습니다:", response.data);
          fetchChats(); // 새 메시지가 저장된 후 채팅 목록 다시 가져오기
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error);
        });

      setMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <div>
      <h1>채팅방</h1>
      <div>
        <ul>
          {/* 채팅 메시지 리스트 표시 */}
          {chat.map((msg, index) => (
            <li key={index}>
              {msg.message}{" "}
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Chat;
