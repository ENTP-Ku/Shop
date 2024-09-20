import React, { useState, useEffect } from "react"; // React 및 필요한 훅을 import합니다.
import { useNavigate } from "react-router-dom"; // 페이지 내비게이션을 위한 훅을 import합니다.
import axios from "axios"; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Home = () => {
  // JWT 토큰과 사용자 이름을 상태 변수로 정의합니다.
  const [jwt, setJwt] = useState(localStorage.getItem("jwt")); // 로컬 스토리지에서 JWT를 가져옵니다.
  const [username, setUsername] = useState(""); // 사용자 이름을 저장할 상태 변수를 초기화합니다.
  const [products, setProducts] = useState([]); // 상품 목록을 저장할 상태 변수를 초기화합니다.
  const [hoveredCategory, setHoveredCategory] = useState(null); // 현재 호버된 카테고리를 저장할 상태 변수를 초기화합니다.
  const navigate = useNavigate(); // navigate 함수를 생성하여 페이지 이동을 처리합니다.

  // JWT 유효성 검사를 위한 useEffect 훅
  useEffect(() => {
    if (jwt) { // JWT가 존재하는 경우
      // 유효성 검사 API 호출
      axios
        .get("/api/validate-token", {
          headers: { Authorization: `Bearer ${jwt}` }, // Bearer 토큰 헤더 추가
        })
        .then((res) => setUsername(res.data.username)) // 성공적으로 응답받으면 사용자 이름 설정
        .catch(() => localStorage.removeItem("jwt")); // 오류가 발생하면 로컬 스토리지에서 JWT 제거
    }
  }, [jwt]); // jwt가 변경될 때마다 이 효과가 실행됩니다.

  // 상품 목록을 가져오기 위한 useEffect 훅
  useEffect(() => {
    axios.get("/api/products") // 상품 목록 API 호출
      .then((res) => setProducts(res.data)); // 응답받은 데이터를 상태에 저장
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("jwt"); // 로컬 스토리지에서 JWT 제거
    setJwt(null); // jwt 상태를 null로 설정
  };

  // 카테고리 클릭 처리 함수
  const handleCategoryClick = (category) => {
    // 카테고리에 따라 다른 데이터를 요청
    const url =
      category === "new" ? "/api/products/new" : `/api/products/${category}`;
    axios.get(url) // 선택한 카테고리의 상품 목록 요청
      .then((res) => setProducts(res.data)); // 응답받은 데이터를 상태에 저장
  };

  return (
    <div>
      <header>
        <h1 style={{ textAlign: "center" }}>쇼핑몰</h1> {/* 제목 */}
        <nav
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button onClick={() => navigate("/board")}>게시판</button> {/* 게시판으로 이동하는 버튼 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {jwt ? ( // JWT가 있을 경우
              <>
                <span>안녕하세요, {username}</span> {/* 사용자 이름 표시 */}
                <button
                  onClick={() => navigate("/upload")}
                  style={{ marginLeft: "10px" }}
                >
                  상품 등록
                </button> {/* 상품 등록 페이지로 이동하는 버튼 */}
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                  로그아웃
                </button> {/* 로그아웃 처리 버튼 */}
              </>
            ) : ( // JWT가 없을 경우
              <>
                <button
                  onClick={() => navigate("/login")}
                  style={{ marginLeft: "10px" }}
                >
                  로그인
                </button> {/* 로그인 페이지로 이동하는 버튼 */}
                <button
                  onClick={() => navigate("/register")}
                  style={{ marginLeft: "10px" }}
                >
                  회원가입
                </button> {/* 회원가입 페이지로 이동하는 버튼 */}
              </>
            )}
          </div>
        </nav>
        <nav style={{ backgroundColor: "#87CEEB", padding: "10px" }}>
          <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
            <li
              onMouseEnter={() => setHoveredCategory("category")} // 카테고리 호버 상태 설정
              onMouseLeave={() => setHoveredCategory(null)} // 카테고리 호버 상태 초기화
              style={{ position: "relative", marginRight: "20px" }}
            >
              카테고리
              {hoveredCategory === "category" && ( // 카테고리가 호버된 상태일 때
                <ul
                  style={{
                    position: "absolute",
                    backgroundColor: "green",
                    listStyleType: "none",
                    padding: "10px",
                    minWidth: "120px", // 원하는 크기로 조정
                  }}
                >
                  <li onClick={() => handleCategoryClick("top")}>상의</li> {/* 상의 카테고리 클릭 */}
                  <li onClick={() => handleCategoryClick("bottom")}>하의</li> {/* 하의 카테고리 클릭 */}
                  <li>
                    <a
                      href="https://namu.wiki/w/%EA%B9%80%EC%A0%95%EC%9D%80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      공산주의
                    </a> {/* 외부 링크 */}
                  </li>
                </ul>
              )}
            </li>
            <li onClick={() => handleCategoryClick("new")}>신상품</li> {/* 신상품 클릭 */}
          </ul>
        </nav>
      </header>

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", // 5개의 열로 구성된 그리드 레이아웃
            gap: "20px", // 그리드 아이템 간의 간격
          }}
        >
          {products.map((product) => ( // 상품 목록을 반복하여 표시
            <div
              key={product.id}
              onClick={() => navigate(`/detail/${product.id}`)} // 클릭 시 상품 상세 페이지로 이동
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ cursor: "pointer" }} // 커서가 포인터로 변경되도록 설정
              />
              <h3>{product.name}</h3> {/* 상품 이름 표시 */}
              <p>{product.price}원</p> {/* 상품 가격 표시 */}
              <p>{product.kind}</p> {/* 상품 종류 표시 */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; // Home 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
