import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css'; // CSS 파일 연결

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isUniqueNumberTaken, setIsUniqueNumberTaken] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  useEffect(() => {
    const checkUsername = async () => {
      if (id) {
        try {
          const response = await axios.post('http://localhost:8080/api/users/check-username', { username: id }); // Base URL 추가
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
          const response = await axios.post('http://localhost:8080/api/users/check-unique-number', { uniqueNumber }); // Base URL 추가
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

    setLoading(true); // 로딩 시작
    try {
      await axios.post('http://localhost:8080/api/users/register', { username: id, password, uniqueNumber }); // Base URL 추가
      alert('환영합니다! 로그인 후 이용해주세요');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
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

      <button onClick={handleRegister} className="register-button" disabled={loading}>
        {loading ? '가입 중...' : '가입'}
      </button> {/* 로딩 상태에 따른 버튼 텍스트 변경 */}

    </div>
    
  );
};

export default Register;
