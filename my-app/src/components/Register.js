import React, { useState, useEffect } from 'react'; // useEffect 추가 import
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Register = () => {
  // 상태 변수를 정의합니다: ID, 비밀번호, 비밀번호 확인, 고유번호
  const [id, setId] = useState(''); // 사용자 ID 상태 초기화
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태 초기화
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 초기화
  const [uniqueNumber, setUniqueNumber] = useState(''); // 고유번호 상태 초기화
  const [isUsernameTaken, setIsUsernameTaken] = useState(false); // 아이디 중복 상태 추가
  const [isUniqueNumberTaken, setIsUniqueNumberTaken] = useState(false); // 고유번호 중복 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  // 아이디 중복 체크
  useEffect(() => {
    const checkUsername = async () => {
      if (id) { // id가 있을 때만 체크
        try {
          const response = await axios.post('/api/users/check-username', { username: id });
          setIsUsernameTaken(response.data); // 중복 여부 저장
        } catch (err) {
          console.error('중복 체크 오류:', err);
        }
      } else {
        setIsUsernameTaken(false); // id가 비어있으면 중복 체크 해제
      }
    };

    checkUsername(); // 중복 체크 함수 호출
  }, [id]); // id가 변경될 때마다 실행

  // 고유번호 중복 체크
  useEffect(() => {
    const checkUniqueNumber = async () => {
      if (uniqueNumber) { // 고유번호가 있을 때만 체크
        try {
          const response = await axios.post('/api/users/check-unique-number', { uniqueNumber }); // JSON 형태로 전송
          setIsUniqueNumberTaken(response.data); // 중복 여부 저장
        } catch (err) {
          console.error('중복 체크 오류:', err);
        }
      } else {
        setIsUniqueNumberTaken(false); // 고유번호가 비어있으면 중복 체크 해제
      }
    };

    checkUniqueNumber(); // 중복 체크 함수 호출
  }, [uniqueNumber]); // 고유번호가 변경될 때마다 실행

  // 회원가입 처리 함수
  const handleRegister = async () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.'); // 불일치 시 알림
      return; // 함수 종료
    }

    // 아이디 중복 체크
    if (isUsernameTaken) {
      alert('이미 사용 중인 아이디입니다. 다른 아이디를 선택해 주세요.'); // 중복 시 알림
      return; // 함수 종료
    }

    // 고유번호 중복 체크
    if (isUniqueNumberTaken) {
      alert('이미 가입한 회원입니다. 다른 고유번호를 선택해 주세요.'); // 중복 시 알림
      return; // 함수 종료
    }

    // POST 요청을 통해 회원가입 시도
    try {
      await axios.post('/api/users/register', { username: id, password, uniqueNumber }); // 엔드포인트 수정
      alert('환영합니다! 로그인 후 이용해주세요'); // 회원가입 성공 시 알림
      navigate('/login'); // 로그인 페이지로 이동
    } catch (err) {
      // 에러 발생 시 에러 메시지 알림
      alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'); // 안전한 접근
    }
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
      {isUsernameTaken && <span style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</span>} {/* 중복 메시지 표시 */}
      
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
      {isUniqueNumberTaken && <span style={{ color: 'red' }}>이미 가입한 회원입니다.</span>} {/* 고유번호 중복 메시지 표시 */}
      
      {/* 회원가입 버튼 */}
      <button onClick={handleRegister}>가입</button>
    </div>
  );
};

export default Register; // Register 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
