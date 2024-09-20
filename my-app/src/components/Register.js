import React, { useState } from 'react'; // React 및 useState 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Register = () => {
  // 상태 변수를 정의합니다: ID, 비밀번호, 비밀번호 확인, 고유번호
  const [id, setId] = useState(''); // 사용자 ID 상태 초기화
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태 초기화
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 초기화
  const [uniqueNumber, setUniqueNumber] = useState(''); // 고유번호 상태 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  // 회원가입 처리 함수
  const handleRegister = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.'); // 불일치 시 알림
      return; // 함수 종료
    }

    // POST 요청을 통해 회원가입 시도
    axios.post('/api/register', { id, password, uniqueNumber })
      .then(() => {
        // 회원가입 성공 시 알림
        alert('환영합니다! 로그인 후 이용해주세요');
        navigate('/login'); // 로그인 페이지로 이동
      })
      .catch(err => {
        // 에러 발생 시 에러 메시지 알림
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      {/* 사용자 ID 입력 필드 */}
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
      {/* 비밀번호 확인 입력 필드 */}
      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      {/* 고유번호 입력 필드 */}
      <input 
        type="text" 
        placeholder="고유번호" 
        value={uniqueNumber} 
        onChange={e => setUniqueNumber(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      {/* 회원가입 버튼 */}
      <button onClick={handleRegister}>가입</button>
    </div>
  );
};

export default Register; // Register 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
