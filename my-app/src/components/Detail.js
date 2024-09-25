import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Detail.css"; // CSS 파일 연결

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((response) => {
        console.log("Fetched product:", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleDelete = () => {
    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        alert("상품이 삭제되었습니다.");
        navigate("/board");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const canDelete =
    localStorage.getItem("jwt") &&
    product.upload_id === localStorage.getItem("userId");

  return (
    <section className="main-content"> {/* 메인 콘텐츠 시작 */}
      <div className="detail-container">
        <div className="detail-float-left">
          <img
            className="product-image"
            src={`http://localhost:8080${product.imagePath}`}
            alt={product.name}
          />
        </div>

        <div className="detail-float-right">
          <p className="product-kind">{product.kind}</p>
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">{product.price} 원</p>
          <div className="detail-desc">
            {/* 상품 상세설명 입력 필요 시 이곳에 내용을 추가 */}
            {/* <p className="description-text">{product.description}</p> */}
          </div>

          {/* 상품 옵션 선택 */}
          <div className="detail-options-container">
            {/* 옵션을 한 줄에 배치 */}
            <div className="detail-options">
              <span className="label-text">Size:</span>
              <label htmlFor="size-select" className="select-label">
                <select className="styled-drop-down" id="size-select" name="size-select">
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>

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

            {/* 주문전, 수량선택 */}
            <div className="before-order">

              <label htmlFor="product-quantity" className="label-text">
                Quantity:
              </label>
              <input type="number" id="product-quantity" className="quantity-input" min="1" defaultValue="1" />






              {/* 장바구니, 주문 버튼 */}
              <button className="cart-button">
                장바구니 담기 - {product.Price * product.quantity}원 ({product.quantity}개)
              </button>
              <button className="order-button">구매하기</button>
            </div>



            {canDelete && (
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

export default Detail;
