import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import '../styles/Login.css'; // Login.css 경로를 설정

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('/api/users/login', { username, password })
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        navigate('/');
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <div className="input-container">
        <input
          className="login-input"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>로그인</button>
      <button className="register-button2" onClick={() => navigate('/register')}>회원가입</button>
    </div>
  );
};

export default Login;
