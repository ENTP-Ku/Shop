import React, { useState, useEffect } from "react"; // React 및 useState, useEffect 훅 임포트
import { useNavigate } from "react-router-dom"; // 페이지 간 내비게이션을 위한 useNavigate 훅 임포트
import axios from "axios"; // API 호출을 위한 axios 임포트
import { jwtDecode } from "jwt-decode"; // JWT 디코드를 위한 jwt-decode 라이브러리 임포트
import "../styles/Upload.css"; // CSS 스타일 파일 연결

const Upload = () => {
  const navigate = useNavigate(); // 내비게이션 훅 생성, 페이지 이동을 위한 함수 제공
  const [name, setName] = useState(""); // 상품명을 관리하는 상태 변수
  const [price, setPrice] = useState(""); // 가격을 관리하는 상태 변수
  const [kind, setKind] = useState(""); // 카테고리를 관리하는 상태 변수
  const [username, setUsername] = useState(""); // 사용자명을 관리하는 상태 변수
  const [images, setImages] = useState([null, null, null]); // 3개의 파일(이미지)을 관리하는 상태 배열

  useEffect(() => {
    // 컴포넌트가 마운트될 때 JWT 토큰을 가져오는 함수
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      try {
        const decoded = jwtDecode(token); // JWT 토큰 디코드하여 사용자 정보 추출
        setUsername(decoded.username); // 디코드된 사용자명을 상태에 설정
      } catch (error) {
        console.error("JWT 디코드 오류:", error); // 디코드 과정에서 오류 발생 시 콘솔에 오류 출력
      }
    }
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 처음 마운트될 때만 실행

  const handleFileChange = (index, file) => {
    // 파일 업로드 필드에서 파일이 변경될 때 호출되는 함수
    const newImages = [...images]; // 기존 이미지를 복사하여 새로운 배열 생성
    newImages[index] = file; // 선택한 파일을 해당 인덱스에 저장
    setImages(newImages); // 상태 업데이트하여 변경된 이미지를 반영
  };

  const handleUpload = async () => {
    // 상품 등록을 처리하는 비동기 함수
    // 필드 유효성 검사: 모든 필드가 채워져 있는지 확인
    if (!name || !price || !kind || !images.some((image) => image)) {
      alert(
        "상품명, 가격, 카테고리, 사용자명이 필요하며, 최소 하나의 이미지를 첨부해야 합니다."
      ); // 유효성 검사 실패 시 경고 알림
      return; // 유효성 검사 실패 시 함수 종료
    }

    const formData = new FormData(); // FormData 객체 생성, 파일 전송을 위한 객체
    formData.append("name", name); // 상품명 추가
    formData.append("price", price); // 가격 추가
    formData.append("kind", kind); // 카테고리 추가
    formData.append("username", username); // 사용자명 추가

    // 이미지를 FormData에 추가
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image); // `image1`, `image2`, `image3` 형식으로 이미지 추가
      }
    });

    try {
      // API 호출을 통해 상품 등록 요청
      await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // 전송할 데이터의 타입 설정
      });
      alert("상품이 등록되었습니다."); // 등록 성공 시 알림
      navigate("/"); // 홈으로 이동
    } catch (error) {
      alert("상품 등록에 실패했습니다."); // 등록 실패 시 알림
    }
  };

  return (
    <div className="upload-body">
      {" "}
      {/* 전체 배경을 감싸는 컨테이너 */}
      <div className="upload-container">
        {" "}
        {/* 상품 등록 폼을 감싸는 컨테이너 */}
        <h1>상품 등록</h1> {/* 제목 */}
        <p>상품의 정보와 사진을 등록합니다</p> {/* 설명 텍스트 */}
        <label htmlFor="title">상품명</label> {/* 상품명 레이블 */}
        <input
          type="text"
          id="title"
          value={name} // 상품명 상태에 연결
          onChange={(e) => setName(e.target.value)} // 입력 시 상태 업데이트
        />
        <label htmlFor="price">가격</label> {/* 가격 레이블 */}
        <input
          type="number"
          id="price"
          value={price} // 가격 상태에 연결
          onChange={(e) => setPrice(e.target.value)} // 입력 시 상태 업데이트
        />
        <label htmlFor="kind">카테고리</label> {/* 카테고리 레이블 */}
        <select
          id="kind"
          value={kind} // 카테고리 상태에 연결
          onChange={(e) => setKind(e.target.value)} // 선택 시 상태 업데이트
        >
          <option value="">선택</option> {/* 기본 선택지 */}
          <option value="top">상의</option> {/* 상의 선택지 */}
          <option value="bottom">하의</option> {/* 하의 선택지 */}
        </select>
        <label htmlFor="image">첨부파일</label> {/* 이미지 첨부 레이블 */}
        {/* 파일 업로드 필드 3개 */}
        {images.map((image, index) => (
          <input
            key={index} // 각 파일 입력 필드의 고유 키
            type="file"
            onChange={(e) => handleFileChange(index, e.target.files[0])} // 파일 선택 시 처리
          />
        ))}
        <button onClick={handleUpload}>등록</button>{" "}
        {/* 등록 버튼, 클릭 시 handleUpload 함수 호출 */}
      </div>
    </div>
  );
};

export default Upload; // Upload 컴포넌트 내보내기
