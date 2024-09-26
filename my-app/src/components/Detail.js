import React, { useState, useEffect } from "react"; // React와 필요한 훅 임포트
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터와 내비게이션을 위한 훅 임포트
import axios from "axios"; // API 호출을 위한 axios 임포트
import "../styles/Detail.css"; // CSS 스타일시트 연결

const Detail = () => {
  const { id } = useParams(); // URL에서 제품 ID 추출
  const navigate = useNavigate(); // 내비게이션 훅 생성
  const [product, setProduct] = useState(null); // 제품 상태 관리 (초기값은 null)

  useEffect(() => {
    // 컴포넌트가 마운트되거나 id가 변경될 때 API 호출
    axios
      .get(`/api/products/id/${id}`) // 특정 제품 ID로 API 호출
      .then((response) => {
        console.log("Fetched product:", response.data); // 성공적으로 제품을 가져왔을 때 콘솔에 로그
        setProduct(response.data); // 제품 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // 에러 발생 시 콘솔에 로그
      });
  }, [id]); // id가 변경될 때마다 effect 실행

  // 제품 데이터가 로드되지 않은 경우 로딩 표시
  if (!product) return <div>Loading...</div>;

  // 제품 삭제 함수
  const handleDelete = () => {
    axios
      .delete(`/api/product/${id}`) // 제품 삭제 API 호출
      .then(() => {
        alert("상품이 삭제되었습니다."); // 삭제 성공 시 알림
        navigate("/board"); // 삭제 후 보드 페이지로 이동
      })
      .catch((error) => {
        console.error("Error deleting product:", error); // 에러 발생 시 콘솔에 로그
      });
  };

  // 삭제 버튼을 활성화할 수 있는지 확인
  const canDelete =
    localStorage.getItem("jwt") && // JWT가 로컬 스토리지에 존재하는지 확인
    product.upload_id === localStorage.getItem("userId"); // 제품 업로드 ID가 현재 사용자 ID와 일치하는지 확인

  return (
    <section className="detail-body"> {/* 메인 콘텐츠 시작 */}
      <div className="detail-container"> {/* 상세 페이지 컨테이너 */}
        <div className="detail-float-left"> {/* 왼쪽에 제품 이미지 표시 */}
          <img
            className="product-image"
            src={`${product.imagePath}`}
            alt={product.name}
          />
        </div>

        <div className="detail-float-right"> {/* 오른쪽에 제품 정보 표시 */}
          <p className="product-kind">{product.kind}</p> {/* 제품 종류 */}
          <h1 className="product-name">{product.name}</h1> {/* 제품 이름 */}
          <p className="uploader">업로더: {product.uploaderId?.username}</p> {/* 업로더 정보 표시 */}
          <hr className="divider" />
          <p className="product-price">{product.price} 원</p> {/* 제품 가격 */}
          
          <div className="detail-desc">
            {/* 상품 상세설명 입력 필요 시 이곳에 내용을 추가 */}
            {/* <p className="description-text">{product.description}</p> */}
          </div>
          <hr className="divider" />
          {/* 상품 옵션 선택 */}
          <div className="detail-options-container">
            <div className="detail-options">
              <div>
                <span className="label-text">Size:</span>
                <label htmlFor="size-select" className="select-label">
                  <select className="styled-drop-down" id="size-select" name="size-select" defaultValue="선택">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
              </div>

              <div>
                <span className="label-text">Color:</span>
                <label htmlFor="color-select" className="select-label">
                  <select className="styled-drop-down" id="color-select" name="color-select">
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Orange">Orange</option>
                  </select>
                </label>
              </div>
            </div>

            {/* 주문전, 수량선택 */}
            <div className="before-order">
              <div className="product-quantity">
                <span className="label-text">Quantity:</span>
                <input type="number" className="quantity-input" placeholder="1" min="1" />
              </div>
              <button className="cart-button">장바구니</button> {/* 장바구니 버튼 */}
              <button className="order-button">구매하기</button> {/* 주문 버튼 */}

            </div>

            {canDelete && ( // 삭제 가능 여부에 따라 삭제 버튼 표시
              <button className="delete-button" onClick={handleDelete}>
                상품삭제
              </button>
            )}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Detail; // Detail 컴포넌트 내보내기
