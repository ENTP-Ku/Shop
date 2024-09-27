// Socket.IO 라이브러리를 사용하여 포트 4000에서 소켓 서버를 설정
const io = require('socket.io')(4000, {
    // CORS 설정: 클라이언트의 출처를 지정하여 요청을 허용
    cors: {
        origin: "http://localhost:3000", // 허용할 클라이언트 URL (프론트엔드)
        methods: ["GET", "POST"] // 허용할 HTTP 메서드
    }
});

// 클라이언트가 소켓 서버에 연결되었을 때 실행되는 이벤트 핸들러
io.on('connection', (socket) => {
    console.log('a user connected'); // 새로운 클라이언트가 연결되었음을 콘솔에 출력

    // 클라이언트로부터 'chat message'라는 이벤트를 수신할 때 실행되는 핸들러
    socket.on('chat message', (msg) => {
        console.log('message: ', msg); // 수신한 메시지를 콘솔에 출력

        // 수신한 메시지를 모든 연결된 클라이언트에게 전송 (브qqqq로드캐스트)
        io.emit('chat message', {
            message: msg.content, // 클라이언트가 보낸 메시지의 내용
            createdAt: new Date() // 메시지가 생성된 날짜 및 시간
        });
    });

    // 클라이언트가 연결을 끊을 때 실행되는 이벤트 핸들러
    socket.on('disconnect', () => {
        console.log('user disconnected'); // 클라이언트가 연결을 끊었음을 콘솔에 출력
    });
});
