import React, { useState, useEffect } from 'react'; // React와 상태 및 효과 훅 가져오기
import { Link, useNavigate } from 'react-router-dom'; // 링크 및 내비게이션 훅 가져오기
import axios from 'axios'; // axios 가져오기
import '../styles/Login.css'; // CSS 스타일 시트 경로

const Login = () => {
  const [username, setUsername] = useState(''); // 사용자 이름 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 내비게이션 훅 초기화
  const [click, setClick] = useState(false); // 모바일 메뉴 클릭 상태
  const [isMobile, setIsMobile] = useState(false); // 모바일 뷰 여부 상태

  // 화면 크기에 따라 모바일 여부 상태 설정
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 960); // 화면 너비가 960px 이하일 경우 모바일로 간주
  };

  useEffect(() => {
    handleResize(); // 컴포넌트가 마운트될 때 한 번 실행
    window.addEventListener('resize', handleResize); // 화면 크기가 변경될 때마다 실행
    return () => window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  const handleClick = () => {
    setClick(!click); // 모바일 메뉴 클릭 상태 전환
  };

  const closeMobileMenu = () => {
    setClick(false); // 모바일 메뉴 닫기
  };

  // 로그인 처리 함수
  const handleLogin = () => {
    axios.post('http://localhost:8080/api/users/login', { username, password }) // 로그인 요청
      .then(res => {
        localStorage.setItem('jwt', res.data.token); // 성공 시 토큰을 로컬 스토리지에 저장
        navigate('/'); // 로그인 성공 시 홈으로 이동
      })
      .catch(err => {
        // 에러 처리
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); // 에러 메시지 표시
        } else {
          alert('로그인에 실패했습니다. 다시 시도해주세요.'); // 일반 에러 메시지 표시
        }
      });
  };

  return (
    <div className="login-page">
      <nav className="navbar"> {/* 네비게이션 시작 */}
        <div className="navbar-container">
          {/* 왼쪽 메뉴 */}
          <ul className="navbar-menu">
            <li>
              <Link to="/products">제품</Link> {/* 제품 페이지 링크 */}
            </li>
            <li>
              <Link to="/board">고객지원</Link> {/* 고객지원 페이지 링크 */}
            </li>        
          </ul>

          {/* 중앙 로고 */}
          <div className="navbar-logo">
            <Link to="/">Amor</Link> {/* 홈페이지 링크 */}
          </div>

          {/* 오른쪽 메뉴 */}
          <ul className="navbar-icons">
            <li>
              <Link to="/search">
                <i className="fa fa-search"></i> {/* 검색 아이콘 */}
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i> {/* 장바구니 아이콘 */}
                <span className="cart-count">{/* 장바구니 내 수량과 연결 */}</span>
              </Link>
            </li>
            <li>
              <Link to="/login">로그인</Link> {/* 로그인 링크 */}
            </li>
            <li>
              <Link to="/register">회원가입</Link> {/* 회원가입 링크 */}
            </li>
            <li>
              <Link to="/chat">채팅</Link> {/* 채팅 페이지 링크 */}
            </li>
          </ul>
        </div>
      </nav>

      {/* 콘텐츠 영역 */}
      <div className="content-wrapper">
        <div className="welcome-section">
          <h1>Welcome!</h1> {/* 환영 메시지 */}
          <p>Explore the world of creativity. Sign in to continue.</p> {/* 설명 텍스트 */}
          <button className="learn-more-btn">Learn More</button> {/* 더 알아보기 버튼 */}
        </div>

        {/* 로그인 폼 */}
        <div className="login-form-container">
          <h2>Sign in</h2> {/* 로그인 제목 */}
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={e => setUsername(e.target.value)} // 사용자 이름 입력 처리
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} // 비밀번호 입력 처리
            className="login-input"
          />
          <button className="submit-btn" onClick={handleLogin}>
            로그인
          </button>

          <div className="option_field">
            <span className="checkbox">
              <input type="checkbox" id="check" /> {/* 아이디 저장 체크박스 */}
              <label htmlFor="check">아이디 저장하기</label>
            </span>
            <Link to="/forgot-password" className="forgot_pw">비밀번호를 잊으셨나요?</Link> {/* 비밀번호 찾기 링크 */}
          </div>

          <div className="login_signup">
            계정이 없으신가요? <Link to="/register">회원가입</Link> {/* 회원가입 링크 */}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p> {/* 저작권 메시지 */}
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li> {/* 개인정보 보호 정책 링크 */}
          <li><Link to="/terms">Terms of Service</Link></li> {/* 서비스 약관 링크 */}
          <li><Link to="/help">Help</Link></li> {/* 도움말 링크 */}
        </ul>
      </footer>
      
    </div>
  );
};

export default Login; // Login 컴포넌트 내보내기
