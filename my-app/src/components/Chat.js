// Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000"); // 서버 URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // 서버에서 받은 메시지를 chat 배열에 추가
    socket.on("message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    // 서버로 메시지 전송
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <h2>채팅</h2>
      <div className="chat-window">
        {chat.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default Chat;
