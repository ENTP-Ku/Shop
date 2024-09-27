import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:4000"); // Connect to socket server

const MChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const username = new URLSearchParams(window.location.search).get("username");

  const fetchMessages = async () => {
    if (username) {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${username}`);
        setMessages(response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
      } catch (error) {
        console.error("메시지를 가져오는 중 오류 발생:", error);
        alert("메시지를 가져오는 데 오류가 발생했습니다.");
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const formattedMessage = { username: username, message: `master: ${inputMessage}` };

    // Emit the message through the socket
    socket.emit("chat message", { ...formattedMessage, createdAt: new Date() });

    try {
      await axios.post(`http://localhost:8080/api/chat/messages`, formattedMessage);
      fetchMessages();
    } catch (error) {
      console.error("메시지 저장 중 오류 발생:", error);
      alert("메시지 저장에 실패했습니다.");
    }

    setInputMessage("");
  };

  useEffect(() => {
    fetchMessages();

    // Listen for new chat messages
    socket.on("chat message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [username]);

  return (
    <div>
      <h2>{username}와의 대화</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.message} <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
};

export default MChat;
