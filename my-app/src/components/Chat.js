import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:4000"); // Connect to socket server

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const token = localStorage.getItem("jwt");
  const username = token ? jwtDecode(token).username : "익명";

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/all-messages?username=${username}`);
      const filteredChats = response.data.filter((msg) => msg.username === username);
      setChat(filteredChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    } catch (error) {
      console.error("채팅을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchChats(); 

    socket.on("chat message", (newMessage) => {
      setChat((prevChat) => [...prevChat, newMessage]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const formattedMessage = {
        message: `${username}: ${message}`,
        username: username,
        createdAt: new Date(), // 메시지에 createdAt 필드를 추가

      };

      axios.post("http://localhost:8080/chat/send", formattedMessage)
        .then((response) => {
          fetchChats();
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error);
        });

      // Emit the message through the socket
      socket.emit("chat message", formattedMessage);

      setMessage("");
    }
  };

  return (
    <div>
      <h1>채팅방</h1>
      <div>
        <ul>
          {chat.map((msg, index) => (
            <li key={index}>
              {msg.message} <small>{new Date(msg.createdAt).toLocaleString()}</small>
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
