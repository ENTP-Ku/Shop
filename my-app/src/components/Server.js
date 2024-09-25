const io = require('socket.io')(4000, { // Socket.IO 서버를 4000번 포트에서 실행
    cors: { // CORS 설정 (Cross-Origin Resource Sharing)
        origin: "http://localhost:3000", // 클라이언트의 주소 (React 앱이 실행되는 주소)
        methods: ["GET", "POST"] // 허용되는 HTTP 메서드 (GET, POST 요청 허용)
    }
});

io.on('connection', (socket) => { // 새로운 클라이언트가 서버에 연결될 때 실행
    console.log('a user connected'); // 클라이언트가 연결되었을 때 콘솔에 로그 출력

    // 'chat message'라는 이벤트를 클라이언트로부터 수신
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg); // 수신한 메시지를 콘솔에 출력
        io.emit('chat message', msg); // 서버에 연결된 모든 클라이언트에게 메시지 전송 (브로드캐스트)
    });

    // 클라이언트가 연결을 끊을 때 실행
    socket.on('disconnect', () => {
        console.log('user disconnected'); // 클라이언트가 연결을 끊었을 때 콘솔에 로그 출력
    });
});
