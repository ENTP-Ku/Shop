import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// 서버와의 연결 설정 (4000번 포트로 연결)
const socket = io('http://localhost:4000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    // 서버에서 메시지를 수신할 때마다 실행
    useEffect(() => {
        socket.on('chat message', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    // 메시지 전송 핸들러
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // 소켓을 통해 메시지를 서버로 전송
            socket.emit('chat message', message);

            // 메시지를 REST API로 백엔드에 저장 요청
            axios.post('http://localhost:8080/chat/send', message)
                .then(response => {
                    console.log('Message saved:', response.data);
                })
                .catch(error => {
                    console.error('Error saving message:', error);
                });

            setMessage(''); // 입력 필드 초기화
        }
    };

    return (
        <div>
            <h1>채팅방</h1>
            <div>
                <ul>
                    {chat.map((msg, index) => (
                        <li key={index}>{msg}</li>
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
