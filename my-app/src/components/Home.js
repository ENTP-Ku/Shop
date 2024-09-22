import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token")); // 로컬 스토리지에서 토큰 가져오기
  const [username, setUsername] = useState(""); // 사용자 이름 상태
  const [products, setProducts] = useState([]); // 상품 목록 상태
  const [hoveredCategory, setHoveredCategory] = useState(null); // 호버된 카테고리 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 토큰 유효성 검사를 위한 useEffect 훅
  useEffect(() => {
    if (token) { // 토큰이 존재할 때
      axios
        .get("/api/validate-token", {
          headers: { Authorization: `Bearer ${token}` }, // Bearer 토큰 헤더 추가
        })
        .then((res) => setUsername(res.data.username)) // 성공적으로 응답받으면 사용자 이름 설정
        .catch(() => localStorage.removeItem("token")); // 오류 시 로컬 스토리지에서 토큰 제거
    }
  }, [token]);

  // 상품 목록을 가져오기 위한 useEffect 훅
  useEffect(() => {
    axios.get("/api/products") // 상품 목록 API 호출
      .then((res) => setProducts(res.data)); // 응답받은 데이터를 상태에 저장
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    setToken(null); // 토큰 상태를 null로 설정
  };

  // 카테고리 클릭 처리 함수
  const handleCategoryClick = (category) => {
    const url =
      category === "new" ? "/api/products/new" : `/api/products/${category}`;
    axios.get(url) // 선택한 카테고리의 상품 목록 요청
      .then((res) => setProducts(res.data)); // 응답받은 데이터를 상태에 저장
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
            {token ? ( // 토큰이 있을 경우
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
            ) : ( // 토큰이 없을 경우
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
                    minWidth: "120px",
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
