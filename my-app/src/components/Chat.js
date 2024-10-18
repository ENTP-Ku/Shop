import React, { useState, useEffect } from "react"; // React 및 상태 관리 훅 임포트
import axios from "axios"; // API 요청을 위한 axios 임포트
import io from "socket.io-client"; // Socket.IO 클라이언트 임포트
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위한 라이브러리 임포트

const socket = io("http://localhost:82"); // Socket 서버에 연결

const Chat = () => {
  const [message, setMessage] = useState(""); // 사용자 입력 메시지 상태
  const [chat, setChat] = useState([]); // 채팅 메시지 목록 상태

  const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 토큰 가져오기
  const username = token ? jwtDecode(token).username : "익명"; // JWT에서 사용자 이름 추출

  // 모든 채팅 메시지를 가져오는 함수
  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/all-messages?username=${username}`); // 채팅 메시지 API 호출
      const filteredChats = response.data.filter((msg) => msg.username === username); // 사용자 이름으로 필터링
      setChat(filteredChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))); // 정렬 후 상태 업데이트
    } catch (error) {
      console.error("채팅을 가져오는 중 오류 발생:", error); // 에러 처리
    }
  };

  // 컴포넌트가 마운트될 때 및 username이 변경될 때 채팅 메시지 가져오기
  useEffect(() => {
    fetchChats(); // 채팅 메시지 가져오기

    // 소켓에서 'chat message' 이벤트 수신
    socket.on("chat message", (newMessage) => {
      setChat((prevChat) => [...prevChat, newMessage]); // 새로운 메시지 추가
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      socket.off("chat message"); // 'chat message' 이벤트 리스너 해제
    };
  }, [username]); // username이 변경될 때마다 effect 실행

  // 메시지 전송 핸들러
  const sendMessage = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    if (message.trim()) { // 메시지가 비어 있지 않은 경우
      const formattedMessage = {
        message: `${username}: ${message}`, // 메시지 포맷
        username: username, // 사용자 이름
        createdAt: new Date(), // 생성 시간
      };

      // 메시지를 서버에 저장
      axios.post("http://localhost:8080/chat/send", formattedMessage)
        .then((response) => {
          fetchChats(); // 메시지 전송 후 채팅 메시지 다시 가져오기
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error); // 에러 처리
        });

      // 소켓을 통해 메시지 전송
      socket.emit("chat message", formattedMessage);

      setMessage(""); // 메시지 입력 필드 초기화
    }
  };

  return (
    <div>
      <h1>채팅방</h1>
      <div>
        <ul>
          {/* 채팅 메시지 목록 렌더링 */}
          {chat.map((msg, index) => (
            <li key={index}>
              {msg.message} <small>{new Date(msg.createdAt).toLocaleString()}</small> {/* 메시지와 생성 시간 표시 */}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendMessage}> {/* 메시지 전송 폼 */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // 입력 변화 시 상태 업데이트
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit">전송</button> {/* 전송 버튼 */}
      </form>
    </div>
  );
};

export default Chat; // Chat 컴포넌트를 내보냄
