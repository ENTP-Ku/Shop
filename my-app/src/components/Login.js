import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; // CSS 경로 확인

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형을 위해 화면 크기에 따른 상태 설정
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 960);
  };

  useEffect(() => {
    handleResize(); // 컴포넌트가 마운트될 때 한 번 실행
    window.addEventListener('resize', handleResize); // 화면 크기가 변경될 때마다 실행
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const handleLogin = () => {
    axios.post('/api/users/login', { username, password })
      .then(res => {
        localStorage.setItem('jwt', res.data.token); // 토큰 저장
        navigate('/'); // 로그인 성공 시 홈으로 이동
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      });
  };

  return (
    <div className="login-page">
      {/* 헤더 */}
      <header className="header">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              쇼핑몰 <i className="fab fa-typo3" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {/* 클릭 상태에 따라 햄버거 아이콘을 변경 */}
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* 콘텐츠 영역 */}
      <div className="content-wrapper">
        <div className="welcome-section">
          <h1>Welcome!</h1>
          <p>Explore the world of creativity. Sign in to continue.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>

        {/* 로그인 폼 */}
        <div className="login-form-container">
          <h2>Sign in</h2>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          <button className="submit-btn" onClick={handleLogin}>
            로그인
          </button>

          <div className="option_field">
            <span className="checkbox">
              <input type="checkbox" id="check" />
              <label htmlFor="check">아이디 저장하기</label>
            </span>
            <Link to="/forgot-password" className="forgot_pw">비밀번호를 잊으셨나요?</Link>
          </div>

          <div className="login_signup">
            계정이 없으신가요? <Link to="/register">회원가입</Link>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Login;
