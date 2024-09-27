import React, { useState, useEffect } from 'react'; // React와 상태 및 효과 훅 가져오기
import { Link, useNavigate } from 'react-router-dom'; // 라우팅 관련 모듈 가져오기
import axios from 'axios'; // axios 가져오기
import '../styles/Register.css'; // CSS 파일 연결

const Register = () => {
  // 상태 변수 선언
  const [id, setId] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
  const [uniqueNumber, setUniqueNumber] = useState(''); // 고유번호 상태
  const [isUsernameTaken, setIsUsernameTaken] = useState(false); // 아이디 중복 체크 상태
  const [isUniqueNumberTaken, setIsUniqueNumberTaken] = useState(false); // 고유번호 중복 체크 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // 네비게이션 훅

  // 아이디 중복 체크 효과
  useEffect(() => {
    const checkUsername = async () => {
      if (id) {
        try {
          const response = await axios.post('http://localhost:8080/api/users/check-username', { username: id }); // 아이디 중복 체크 API 호출
          setIsUsernameTaken(response.data); // 중복 여부 상태 업데이트
        } catch (err) {
          console.error('중복 체크 오류:', err); // 오류 로그
        }
      } else {
        setIsUsernameTaken(false); // 아이디가 비어있으면 중복 체크 해제
      }
    };

    checkUsername(); // 중복 체크 함수 호출
  }, [id]); // id 상태가 변경될 때마다 실행

  // 고유번호 중복 체크 효과
  useEffect(() => {
    const checkUniqueNumber = async () => {
      if (uniqueNumber) {
        try {
          const response = await axios.post('http://localhost:8080/api/users/check-unique-number', { uniqueNumber }); // 고유번호 중복 체크 API 호출
          setIsUniqueNumberTaken(response.data); // 중복 여부 상태 업데이트
        } catch (err) {
          console.error('중복 체크 오류:', err); // 오류 로그
        }
      } else {
        setIsUniqueNumberTaken(false); // 고유번호가 비어있으면 중복 체크 해제
      }
    };

    checkUniqueNumber(); // 중복 체크 함수 호출
  }, [uniqueNumber]); // uniqueNumber 상태가 변경될 때마다 실행

  // 회원가입 처리 함수
  const handleRegister = async () => {
    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.'); // 일치하지 않으면 경고
      return;
    }

    // 아이디 중복 여부 확인
    if (isUsernameTaken) {
      alert('이미 사용 중인 아이디입니다. 다른 아이디를 선택해 주세요.'); // 중복 시 경고
      return;
    }

    // 고유번호 중복 여부 확인
    if (isUniqueNumberTaken) {
      alert('이미 가입한 회원입니다. 다른 고유번호를 선택해 주세요.'); // 중복 시 경고
      return;
    }

    setLoading(true); // 로딩 시작
    try {
      // 회원가입 API 호출
      await axios.post('http://localhost:8080/api/users/register', { username: id, password, uniqueNumber });
      alert('환영합니다! 로그인 후 이용해주세요'); // 성공 메시지
      navigate('/login'); // 로그인 페이지로 이동
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'); // 오류 처리
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  return (
    <div className="register-container">
      <nav className="navbar"> {/* 네비게이션 시작 */}
        <div className="navbar-container">
          {/* 왼쪽 메뉴 */}
          <ul className="navbar-menu">
            <li>
              <Link to="/products">제품</Link>
            </li>
            <li>
              <Link to="/board">고객지원</Link>
            </li>        
          </ul>

          {/* 중앙 로고 */}
          <div className="navbar-logo">
            <Link to="/">Amor</Link>
          </div>

          {/* 오른쪽 메뉴 */}
          <ul className="navbar-icons">
            <li>
              <Link to="/search">
                <i className="fa fa-search"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span className="cart-count">{/* 장바구니 내 수량과 연결 */}</span>
              </Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
            <li>
              <Link to="/chat">채팅</Link>
            </li>
          </ul>
        </div>
      </nav>

      <input 
        type="text"  
        placeholder="아이디" 
        value={id} 
        onChange={e => setId(e.target.value)} 
        className="input-field"
      />
      {isUsernameTaken && <span className="error-message">이미 사용 중인 아이디입니다.</span>} {/* 아이디 중복 메시지 */}

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
      {isUniqueNumberTaken && <span className="error-message">이미 가입한 회원입니다.</span>} {/* 고유번호 중복 메시지 */}

      <button onClick={handleRegister} className="register-button" disabled={loading}>
        {loading ? '가입 중...' : '가입'} {/* 로딩 상태에 따른 버튼 텍스트 변경 */}
      </button>
    </div>
  );
};

export default Register; // Register 컴포넌트 내보내기
