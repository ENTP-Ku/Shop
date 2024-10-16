import React, { useState, useEffect } from "react"; // React와 상태 및 효과 훅 가져오기
import axios from "axios"; // axios 가져오기
import io from "socket.io-client"; // socket.io-client 가져오기

const socket = io("http://localhost:81"); // 소켓 서버에 연결

const MChat = () => {
  const [messages, setMessages] = useState([]); // 메시지 상태
  const [inputMessage, setInputMessage] = useState(""); // 입력 메시지 상태
  const username = new URLSearchParams(window.location.search).get("username"); // URL에서 사용자 이름 추출

  // 메시지를 가져오는 비동기 함수
  const fetchMessages = async () => {
    if (username) {
      try {
        // 사용자 이름으로 서버에서 메시지 요청
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${username}`);
        // 가져온 메시지를 시간 순으로 정렬하여 상태 업데이트
        setMessages(response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
      } catch (error) {
        console.error("메시지를 가져오는 중 오류 발생:", error);
        alert("메시지를 가져오는 데 오류가 발생했습니다."); // 오류 알림
      }
    }
  };

  // 메시지 전송 처리 함수
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return; // 빈 메시지 전송 방지

    // 포맷된 메시지 객체
    const formattedMessage = { username: username, message: `master: ${inputMessage}` };

    // 소켓을 통해 메시지 전송
    socket.emit("chat message", { ...formattedMessage, createdAt: new Date() });

    try {
      // 메시지를 서버에 저장
      await axios.post(`http://localhost:8080/api/chat/messages`, formattedMessage);
      fetchMessages(); // 메시지 목록 갱신
    } catch (error) {
      console.error("메시지 저장 중 오류 발생:", error);
      alert("메시지 저장에 실패했습니다."); // 오류 알림
    }

    setInputMessage(""); // 입력창 초기화
  };

  useEffect(() => {
    fetchMessages(); // 컴포넌트가 마운트될 때 메시지 가져오기

    // 새로운 채팅 메시지 수신 대기
    socket.on("chat message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 새로운 메시지를 상태에 추가
    });

    return () => {
      socket.off("chat message"); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [username]);

  return (
    <div>
      <h2>{username}와의 대화</h2> {/* 대화 상대 이름 표시 */}
      <ul>
        {/* 메시지 목록 표시 */}
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.message} <small>{new Date(msg.createdAt).toLocaleString()}</small> {/* 메시지와 생성 시간 표시 */}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage} // 입력창의 값
        onChange={(e) => setInputMessage(e.target.value)} // 입력값 변경 처리
        placeholder="메시지를 입력하세요..." // 입력창 자리 표시 텍스트
      />
      <button onClick={handleSendMessage}>전송</button> {/* 메시지 전송 버튼 */}
    </div>
  );
};

export default MChat; // MChat 컴포넌트 내보내기
