import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  useEffect(() => {
    if (jwt) {
      // JWT 유효성을 백엔드에서 확인
      axios.get('/api/validate-token', { headers: { Authorization: `Bearer ${jwt}` } })
        .then(res => setUsername(res.data.username))
        .catch(() => localStorage.removeItem('jwt'));
    }
  }, [jwt]);

  useEffect(() => {
    // 상품 정보 로딩
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
  };

  return (
    <div>
      <header>
        <h1 style={{ textAlign: 'center' }}>쇼핑몰</h1>
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
            <li>
              <Link to="/board">게시판</Link>
            </li>
            {jwt ? (
              <>
                <li>
                  안녕하세요, {username}
                </li>
                <li>
                  <button onClick={() => navigate('/upload')}>상품 등록</button> {/* history.push 대신 navigate 사용 */}
                </li>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => navigate('/login')}>로그인</button> {/* history.push 대신 navigate 사용 */}
                </li>
                <li>
                  <button onClick={() => navigate('/register')}>회원가입</button> {/* history.push 대신 navigate 사용 */}
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <nav>
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          <li>카테고리</li>
          <li>신상품</li>
        </ul>
        {/* 카테고리 하위 메뉴 */}
        <ul>
          <li>상의</li>
          <li>하의</li>
          <li>
            <a href="https://namu.wiki/w/%EA%B9%80%EC%A0%95%EC%9D%80" target="_blank" rel="noopener noreferrer">공산주의</a>
          </li>
        </ul>
      </nav>

      <div>
        {/* 상품 목록 출력 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} onClick={() => navigate(`/detail/${product.id}`)}> {/* history.push 대신 navigate 사용 */}
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}원</p>
              <p>{product.kind}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
