const express = require('express'); // Express 프레임워크 가져오기
const http = require('http'); // HTTP 모듈 가져오기
const { Server } = require('socket.io'); // Socket.IO 서버 모듈 가져오기

const app = express(); // Express 애플리케이션 생성
const server = http.createServer(app); // HTTP 서버 생성 (Express 애플리케이션을 인자로 전달)
const io = new Server(server, { // Socket.IO 서버 초기화
  cors: { // CORS 설정
    origin: "http://localhost:3000", // 프론트엔드의 요청 허용
    methods: ["GET", "POST"] // 허용할 HTTP 메서드
  }
});

// 소켓 연결 처리
io.on('connection', (socket) => { // 클라이언트가 연결될 때 호출되는 이벤트 리스너
  console.log('A user connected:', socket.id); // 연결된 클라이언트의 ID 로그 출력

  // 채팅 메시지 리스너
  socket.on('chat message', (msg) => { // 'chat message' 이벤트를 수신
    io.emit('chat message', msg); // 모든 연결된 클라이언트에 메시지 브로드캐스트
  });

  // 연결 해제 처리
  socket.on('disconnect', () => { // 클라이언트가 연결을 끊을 때 호출되는 이벤트 리스너
    console.log('A user disconnected:', socket.id); // 연결 해제된 클라이언트의 ID 로그 출력
  });
});

// 서버를 지정된 포트에서 리슨
server.listen(4000, () => {
  console.log('Socket server running on port 4000'); // 서버가 실행 중임을 알리는 로그 출력
});
