import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Upload.css"; // CSS 파일 연결
import "../styles/Detail.css"; // detail CSS 스타일시트 연결
import { jwtDecode } from "jwt-decode"; // 명명된 내보내기로 가져오기

const Upload = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [kind, setKind] = useState("");

  // 단일 파일을 관리하는 상태
  const [image, setImage] = useState(null);

  // JWT에서 사용자 ID 추출하는 함수
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('jwt'); // 로컬 스토리지에서 JWT 가져오기
    if (token) {
      const decodedToken = jwtDecode(token); // JWT 디코딩
      return decodedToken.username; // 사용자 ID를 username으로 반환
    }
    return null; // 토큰이 없으면 null 반환
  };

  // 사용자 ID (프론트에서 받아온 값으로 가정)
  const userId = getUserIdFromToken(); // 사용자 ID를 JWT에서 추출

  // 파일 변경 시 호출되는 함수
  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleUpload = async () => {
    // 필드 유효성 검사
    if (!name || !price || !kind || !image) {
      alert("상품명, 가격, 카테고리를 입력하고, 이미지를 첨부해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("kind", kind);
    formData.append("uploaderId", userId); // 프론트에서 받아온 사용자 ID 추가
    formData.append("image", image); // 단일 이미지 추가

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("상품이 등록되었습니다.");
      navigate("/");
    } catch (error) {
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <section className="upload-body">
      {/* 네비게이션 시작 */}
      <nav className="navbar">
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
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/chat">채팅</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* 전체 배경을 감싸는 컨테이너 */}
      <div className="upload-body-container">
        <div className="upload-container">
          <h1>상품 등록</h1>
          <p>상품의 정보와 사진을 등록합니다</p>

          <label htmlFor="title">상품명</label>
          <input
            type="text"
            id="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="kind">카테고리</label>
          <select
            id="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          >
            <option value="">선택</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
          </select>
          <label htmlFor="image">첨부파일</label>
          {/* 파일 업로드 필드 1개 */}
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          <button onClick={handleUpload}>등록</button>
        </div>
      </div>
    </section>
  );
};

export default Upload; // Upload 컴포넌트 내보내기
