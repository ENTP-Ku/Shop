import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css'; // CSS 파일 연결
import "../styles/Detail.css"; // detail CSS 스타일시트 연결

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isUniqueNumberTaken, setIsUniqueNumberTaken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUsername = async () => {
      if (id) {
        try {
          const response = await axios.post('/api/users/check-username', { username: id });
          setIsUsernameTaken(response.data);
        } catch (err) {
          console.error('중복 체크 오류:', err);
        }
      } else {
        setIsUsernameTaken(false);
      }
    };

    checkUsername();
  }, [id]);

  useEffect(() => {
    const checkUniqueNumber = async () => {
      if (uniqueNumber) {
        try {
          const response = await axios.post('/api/users/check-unique-number', { uniqueNumber });
          setIsUniqueNumberTaken(response.data);
        } catch (err) {
          console.error('중복 체크 오류:', err);
        }
      } else {
        setIsUniqueNumberTaken(false);
      }
    };

    checkUniqueNumber();
  }, [uniqueNumber]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (isUsernameTaken) {
      alert('이미 사용 중인 아이디입니다. 다른 아이디를 선택해 주세요.');
      return;
    }

    if (isUniqueNumberTaken) {
      alert('이미 가입한 회원입니다. 다른 고유번호를 선택해 주세요.');
      return;
    }

    try {
      await axios.post('/api/users/register', { username: id, password, uniqueNumber });
      alert('환영합니다! 로그인 후 이용해주세요');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="register-container">
      <input 
        type="text" 
        placeholder="아이디" 
        value={id} 
        onChange={e => setId(e.target.value)} 
        className="input-field"
      />
      {isUsernameTaken && <span className="error-message">이미 사용 중인 아이디입니다.</span>}

      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        className="input-field"
      />

      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} 
        className="input-field"
      />

      <input 
        type="text" 
        placeholder="고유번호" 
        value={uniqueNumber} 
        onChange={e => setUniqueNumber(e.target.value)} 
        className="input-field"
      />
      {isUniqueNumberTaken && <span className="error-message">이미 가입한 회원입니다.</span>}

      <button onClick={handleRegister} className="register-button">가입</button>
    </div>
  );
};

export default Register;
