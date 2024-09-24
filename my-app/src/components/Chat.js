import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/Chat.css"; // CSS 파일 연결

const socket = io.connect("http://localhost:4000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  // "관리자"와의 대화를 전제로 설정
  const adminUser = "관리자";

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { user: adminUser, text: message }); // 무조건 관리자와의 대화로 설정
      setMessage("");
    }
  };

  return (
    <div>
      <h2>관리자와 채팅</h2>
      <div>{isConnected ? "서버 연결됨" : "서버 연결 끊김"}</div>
      
      {/* Chat window with messages */}
      <div className="chat-window">
        {chat.map((msg, idx) => (
          <div key={idx} className={msg.user === adminUser ? "admin-message" : ""}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>
        
      {/* Input for chat message */}
      <input
        type="text"
        className="chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      
      {/* Send button */}
      <button onClick={sendMessage} className="send-button">
        전송
      </button>
    </div>
  );
};

export default Chat;
