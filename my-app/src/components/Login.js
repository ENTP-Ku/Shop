import React, { useState } from 'react'; // React 및 useState 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Login = () => {
  // 아이디와 비밀번호를 상태 변수로 정의합니다.
  const [id, setId] = useState(''); // 사용자 ID 상태 초기화
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  // 로그인 처리 함수
  const handleLogin = () => {
    // POST 요청을 통해 로그인 시도
    axios.post('/api/users/login', { id, password })
      .then(res => {
        // 로그인 성공 시 JWT를 로컬 스토리지에 저장
        localStorage.setItem('jwt', res.data.token);
        navigate('/'); // 홈으로 이동
      })
      .catch(err => {
        // 로그인 실패 시 에러 메시지 알림
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      {/* 아이디 입력 필드 */}
      <input 
        type="text" 
        placeholder="아이디" 
        value={id} 
        onChange={e => setId(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      {/* 비밀번호 입력 필드 */}
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={e => setPassword(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      {/* 로그인 버튼 */}
      <button onClick={handleLogin}>로그인</button>
      {/* 회원가입 페이지로 이동하는 버튼 */}
      <button onClick={() => navigate('/register')}>회원가입</button> 
    </div>
  );
};

export default Login; // Login 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
