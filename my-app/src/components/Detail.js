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
    <div className="detail-container">
      <img
        className="product-image"
        src={`http://localhost:8080${product.imagePath}`}
        alt={product.name}
      />
      <h1 className="product-name">{product.name}</h1>
      <p className="product-price">{product.price} 원</p>
      <p className="product-kind">{product.kind}</p>
      <input type="number" className="quantity-input" placeholder="수량 선택" />
      <button className="order-button">주문하기</button>
      {canDelete && (
        <button className="delete-button" onClick={handleDelete}>
          글삭제
        </button>
      )}
    </div>
  );
};

export default Detail;
