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
    <div className="login_home">
      <div className="form_container">
        <i className="uil uil-times form_close" onClick={() => navigate('/')} />
        <div className="form login_form">
          <h2>로그인</h2>
          <div className="input_box">
            <input
              type="text"
              placeholder="아이디"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="비밀번호"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="option_field">
            <span className="checkbox">
              <input type="checkbox" id="check" />
              <label htmlFor="check">아이디 저장하기</label>
            </span>
            <a href="#" className="forgot_pw">비밀번호를 잊으셨나요?</a>
          </div>
          <button className="button" onClick={handleLogin}>로그인</button>
          <div className="login_signup">
            계정이 없으신가요? <a href="#" onClick={() => navigate('/register')}>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
