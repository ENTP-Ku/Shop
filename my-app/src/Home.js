import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 스타일을 위한 별도의 CSS 파일

function Home() {
  return (
    <div>
      <h1>쇼핑몰</h1>
      <nav className="product-navbar">
        <ul className="product-menu">
          <li><Link to="/category/clothing">의류</Link></li>
          <li><Link to="/category/electronics">전자제품</Link></li>
          <li><Link to="/category/furniture">가구</Link></li>
          <li><Link to="/category/grocery">식료품</Link></li>
          <li><Link to="/category/sports">스포츠</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
