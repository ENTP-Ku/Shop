import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      axios
        .get("/api/validate-token", {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => setUsername(res.data.username))
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, [jwt]);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
  };

  const handleCategoryClick = (category) => {
    // 카테고리에 따라 다른 데이터를 요청
    const url =
      category === "new" ? "/api/products/new" : `/api/products/${category}`;
    axios.get(url).then((res) => setProducts(res.data));
  };

  return (
    <div>
      <header>
        <h1 style={{ textAlign: "center" }}>쇼핑몰</h1>
        <nav
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button onClick={() => navigate("/board")}>게시판</button>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {jwt ? (
              <>
                <span>안녕하세요, {username}</span>
                <button
                  onClick={() => navigate("/upload")}
                  style={{ marginLeft: "10px" }}
                >
                  상품 등록
                </button>
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  style={{ marginLeft: "10px" }}
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate("/register")}
                  style={{ marginLeft: "10px" }}
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </nav>
        <nav style={{ backgroundColor: "#87CEEB", padding: "10px" }}>
          <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
            <li
              onMouseEnter={() => setHoveredCategory("category")}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{ position: "relative", marginRight: "20px" }}
            >
              카테고리
              {hoveredCategory === "category" && (
                <ul
                  style={{
                    position: "absolute",
                    backgroundColor: "green",
                    listStyleType: "none",
                    padding: "10px",
                    minWidth: "120px", // 원하는 크기로 조정
                  }}
                >
                  <li onClick={() => handleCategoryClick("top")}>상의</li>
                  <li onClick={() => handleCategoryClick("bottom")}>하의</li>
                  <li>
                    <a
                      href="https://namu.wiki/w/%EA%B9%80%EC%A0%95%EC%9D%80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      공산주의
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li onClick={() => handleCategoryClick("new")}>신상품</li>
          </ul>
        </nav>
      </header>

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/detail/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ cursor: "pointer" }}
              />
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
