import React, { useState } from "react"; // React와 useState 훅 가져오기
import { useNavigate, Link } from "react-router-dom"; // useNavigate 훅과 Link 컴포넌트 가져오기
import axios from "axios"; // axios 라이브러리 가져오기
import "../styles/Upload.css"; // Upload 컴포넌트에 대한 CSS 스타일시트 연결
import "../styles/Detail.css"; // Detail 컴포넌트에 대한 CSS 스타일시트 연결
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위한 라이브러리 가져오기

const Upload = () => { // Upload 컴포넌트 정의
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [name, setName] = useState(""); // 상품명 상태 관리
  const [price, setPrice] = useState(""); // 가격 상태 관리
  const [kind, setKind] = useState(""); // 카테고리 상태 관리

  // 단일 파일을 관리하는 상태
  const [image, setImage] = useState(null); // 이미지 파일 상태 관리

  // JWT에서 사용자 ID 추출하는 함수
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('jwt'); // 로컬 스토리지에서 JWT 가져오기
    if (token) {
      const decodedToken = jwtDecode(token); // JWT 디코딩
      return decodedToken.username; // 디코딩된 JWT에서 사용자 ID 반환
    }
    return null; // 토큰이 없으면 null 반환
  };

  // 사용자 ID (프론트에서 받아온 값으로 가정)
  const userId = getUserIdFromToken(); // JWT에서 사용자 ID 추출

  // 파일 변경 시 호출되는 함수
  const handleFileChange = (file) => {
    setImage(file); // 선택한 파일을 상태에 저장
  };

  const handleUpload = async () => { // 상품 등록 처리 함수
    // 필드 유효성 검사
    if (!name || !price || !kind || !image) {
      alert("상품명, 가격, 카테고리를 입력하고, 이미지를 첨부해주세요."); // 필드 입력 확인
      return; // 유효성 검사 실패 시 종료
    }

    const formData = new FormData(); // FormData 객체 생성
    formData.append("name", name); // 상품명 추가
    formData.append("price", price); // 가격 추가
    formData.append("kind", kind); // 카테고리 추가
    formData.append("uploaderId", userId); // 프론트에서 받아온 사용자 ID 추가
    formData.append("image", image); // 단일 이미지 추가

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // 요청 헤더 설정
      });
      alert("상품이 등록되었습니다."); // 등록 성공 메시지
      navigate("/"); // 홈으로 이동
    } catch (error) {
      alert("상품 등록에 실패했습니다."); // 등록 실패 메시지
    }
  };

  return (
    <section className="upload-body"> {/* 전체 섹션 감싸기 */}
      {/* 네비게이션 시작 */}
      <nav className="navbar"> {/* 네비게이션 바 */}
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
              <Link to="/login">로그인</Link> {/* 로그인 페이지 링크 */}
            </li>
            <li>
              <Link to="/signup">회원가입</Link> {/* 회원가입 페이지 링크 */}
            </li>
            <li>
              <Link to="/chat">채팅</Link> {/* 채팅 페이지 링크 */}
            </li>
          </ul>
        </div>
      </nav>
      {/* 전체 배경을 감싸는 컨테이너 */}
      <div className="upload-body-container"> {/* 상품 등록 컨테이너 */}
        <div className="upload-container">
          <h1>상품 등록</h1> {/* 제목 */}
          <p>상품의 정보와 사진을 등록합니다</p> {/* 설명 */}

          <label htmlFor="title">상품명</label> {/* 상품명 라벨 */}
          <input
            type="text"
            id="title"
            value={name} // 상품명 상태 연결
            onChange={(e) => setName(e.target.value)} // 상품명 변경 처리
          />
          <label htmlFor="price">가격</label> {/* 가격 라벨 */}
          <input
            type="number"
            id="price"
            value={price} // 가격 상태 연결
            onChange={(e) => setPrice(e.target.value)} // 가격 변경 처리
          />
          <label htmlFor="kind">카테고리</label> {/* 카테고리 라벨 */}
          <select
            id="kind"
            value={kind} // 카테고리 상태 연결
            onChange={(e) => setKind(e.target.value)} // 카테고리 변경 처리
          >
            <option value="">선택</option> {/* 선택지 없음 */}
            <option value="top">상의</option> {/* 상의 옵션 */}
            <option value="bottom">하의</option> {/* 하의 옵션 */}
          </select>
          <label htmlFor="image">첨부파일</label> {/* 파일 첨부 라벨 */}
          {/* 파일 업로드 필드 1개 */}
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files[0])} // 파일 선택 시 처리
          />
          <button onClick={handleUpload}>등록</button> {/* 등록 버튼 */}
        </div>
      </div>
    </section>
  );
};

export default Upload; // Upload 컴포넌트 내보내기
