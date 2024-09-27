import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // 소켓 클라이언트 가져오기

const socket = io("http://localhost:4000"); // 소켓 서버 연결

const MChat = () => {
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [inputMessage, setInputMessage] = useState(""); // 입력 메시지 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const username = new URLSearchParams(window.location.search).get("username"); // URL에서 username 추출

  // 특정 사용자와의 메시지를 가져오는 함수
  const fetchMessages = async () => {
    if (username) {
      setLoading(true); // 로딩 시작
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${username}`); // Base URL 추가
        setMessages(response.data); // 메시지 목록 상태 업데이트
      } catch (error) {
        console.error("메시지를 가져오는 중 오류 발생:", error);
        alert("메시지를 가져오는 데 오류가 발생했습니다."); // 사용자에게 오류 알림
      } finally {
        setLoading(false); // 로딩 끝
      }
    }
  };

  // 메시지 배열을 시간 오름차순으로 정렬하는 함수
  const sortMessages = (msgs) => {
    return msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return; // 빈 메시지 전송 방지

    const formattedMessage = { username: username, message: `master: ${inputMessage}` }; // 메시지 포맷팅에 접두사 추가

    // 소켓을 통해 메시지 전송
    socket.emit("chat message", formattedMessage);

    // 데이터베이스에 메시지 저장
    try {
      await axios.post(`http://localhost:8080/api/chat/messages`, formattedMessage); // DB에 메시지 저장
      // 로컬 상태에도 메시지 추가 후 정렬
      setMessages((prevMessages) => sortMessages([...prevMessages, { ...formattedMessage, createdAt: new Date() }]));
    } catch (error) {
      console.error("메시지 저장 중 오류 발생:", error);
      alert("메시지 저장에 실패했습니다."); // 오류 알림
    }

    setInputMessage(""); // 입력창 비우기
  };

  useEffect(() => {
    fetchMessages(); // 메시지 가져오기

    // 소켓에서 메시지 수신
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => sortMessages([...prevMessages, { ...msg, createdAt: new Date() }])); // 수신한 메시지 추가 후 정렬
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 해제
    return () => {
      socket.off("chat message");
    };
  }, [username]);

  return (
    <div>
      <h2>{username}와의 대화</h2>
      {loading ? (
        <p>로딩 중...</p> // 로딩 중 표시
      ) : (
        <ul>
          {sortMessages(messages).map((msg, index) => ( // 정렬된 메시지 목록 표시
            <li key={index}>
              {msg.message}{" "}
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
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
