import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // 스타일을 위한 별도의 CSS 파일

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('clothing'); // 기본 카테고리 설정

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>쇼핑몰</h1>
      <nav className="product-navbar">
        <ul className="product-menu">
          <li><Link to="#" onClick={() => setCategory('clothing')}>의류</Link></li>
          <li><Link to="#" onClick={() => setCategory('electronics')}>전자제품</Link></li>
          <li><Link to="#" onClick={() => setCategory('furniture')}>가구</Link></li>
          <li><Link to="#" onClick={() => setCategory('grocery')}>식료품</Link></li>
          <li><Link to="#" onClick={() => setCategory('sports')}>스포츠</Link></li>
        </ul>
      </nav>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
