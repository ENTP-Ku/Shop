import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate를 가져옵니다.
import axios from 'axios';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleLogin = () => {
    axios.post('/api/login', { id, password })
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        navigate('/'); // history.push 대신 navigate 사용
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <input type="text" placeholder="아이디" value={id} onChange={e => setId(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/register')}>회원가입</button> {/* history.push 대신 navigate 사용 */}
    </div>
  );
};

export default Login;
