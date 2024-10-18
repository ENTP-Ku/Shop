import React, { useState, useEffect } from "react"; // React 및 상태 관리 훅 임포트
import axios from "axios"; // API 요청을 위한 axios 임포트
import io from "socket.io-client"; // Socket.IO 클라이언트 임포트

const socket = io("http://localhost:4000"); // 소켓 서버에 연결

const ChatML = () => {
  const [chats, setChats] = useState([]); // 사용자 목록과 최신 메시지 상태

  // 모든 사용자 목록과 최신 메시지를 가져오는 함수
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chat/messages'); // 사용자 목록을 가져오기 위한 API 호출
      setChats(response.data); // 사용자 목록과 최신 메시지 상태 업데이트
    } catch (error) {
      console.error("사용자 목록을 가져오는 중 오류 발생:", error); // 에러 처리
    }
  };

  // 사용자 클릭 핸들러
  const handleUserClick = (username) => {
    // 새로운 창에서 MChat으로 이동
    window.open(`/mChat?username=${username}`, "_blank", "width=600,height=700,resizable=yes,scrollbars=yes"); // MChat을 새 창에서 열기
  };

  // 컴포넌트가 마운트될 때 사용자 목록 가져오기
  useEffect(() => {
    fetchUsers(); // 사용자 목록 가져오기

    // 소켓에서 채팅 메시지를 수신
    socket.on("chat message", (msg) => {
      setChats((prevChats) => {
        // 기존 채팅 목록에서 해당 사용자의 최신 메시지를 업데이트
        const existingChat = prevChats.find(chat => chat.username === msg.username); // 기존 사용자의 채팅 찾기
        if (existingChat) {
          return prevChats.map(chat => 
            chat.username === msg.username
              ? { ...chat, latestMessage: msg.message, createdAt: new Date() } // 최신 메시지와 시간 업데이트
              : chat
          );
        } else {
          // 새로운 사용자의 메시지가 오면 새로운 채팅 추가
          return [...prevChats, { username: msg.username, latestMessage: msg.message, createdAt: new Date() }]; // 새 사용자 추가
        }
      });
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 제거
    return () => {
      socket.off("chat message"); // 'chat message' 이벤트 리스너 해제
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 한 번만 실행됨

  return (
    <div>
      <h1>관리자 채팅 목록</h1>
      <div>
        <ul>
          {/* 사용자 목록과 최신 메시지 표시 */}
          {chats.map((chat) => (
            <li key={chat.username} onClick={() => handleUserClick(chat.username)}> {/* 사용자 클릭 시 MChat 열기 */}
              <strong>{chat.username}</strong>: {chat.latestMessage} {/* 최신 메시지 표시 */}
              <small>{new Date(chat.createdAt).toLocaleString()}</small> {/* 메시지 시간 표시 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatML; // ChatML 컴포넌트를 내보냄
