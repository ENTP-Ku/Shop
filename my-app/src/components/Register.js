import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate를 가져옵니다.
import axios from 'axios';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용합니다.

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios.post('/api/register', { id, password, uniqueNumber })
      .then(() => {
        alert('환영합니다! 로그인 후 이용해주세요');
        navigate('/login'); // history.push 대신 navigate를 사용합니다.
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <input type="text" placeholder="아이디" value={id} onChange={e => setId(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <input type="text" placeholder="고유번호" value={uniqueNumber} onChange={e => setUniqueNumber(e.target.value)} />
      <button onClick={handleRegister}>가입</button>
    </div>
  );
};

export default Register;
