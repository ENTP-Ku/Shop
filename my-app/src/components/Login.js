import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const Login = () => {
  const [username, setUsername] = useState(''); // 사용자 ID 상태 초기화
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  const handleLogin = () => {    
    axios.post('/api/users/login', { username, password }) // username으로 변경
      .then(res => {        
        localStorage.setItem('jwt', res.data.token); // JWT 저장
        navigate('/'); // 홈으로 이동
      })
      .catch(err => {        
        alert(err.response.data.message); // 에러 메시지 알림
      });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="아이디" 
        value={username} 
        onChange={e => setUsername(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={e => setPassword(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/register')}>회원가입</button> 
    </div>
  );
};

export default Login;
