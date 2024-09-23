import React, { useState, useEffect } from "react"; // React와 필요한 훅을 import합니다.
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터와 페이지 내비게이션을 위한 훅을 import합니다.
import axios from "axios"; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Detail = () => {
  const { id } = useParams(); // URL에서 상품 ID를 추출합니다.
  const navigate = useNavigate(); // 페이지 내비게이션을 위한 navigate 함수 생성
  const [product, setProduct] = useState(null); // 상품 정보를 저장할 상태 변수를 선언합니다. 초기값은 null입니다.

  // 컴포넌트가 마운트되거나 ID가 변경될 때 실행되는 useEffect 훅
  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((response) => {
        console.log("Fetched product:", response.data); // 응답 데이터 확인
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  // 상품 정보가 로드되기 전에는 로딩 메시지를 표시합니다.
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={`http://localhost:8080${product.imagePath}`}
        alt={product.name}
        style={{ width: "400px", height: "400px", margin: "20px" }}
      />{" "}
      {/* 상품 이미지 표시 */}
      <h1>{product.name}</h1> {/* 상품 이름 표시 */}
      <p>{product.price} 원</p> {/* 상품 가격 표시 */}
      <p>{product.kind}</p> {/* 상품 종류 표시 */}
      <input type="number" placeholder="수량 선택" /> {/* 수량 입력 필드 */}
      <button>주문하기</button> {/* 주문하기 버튼 */}
      {/* JWT가 저장되어 있고, 현재 사용자가 상품의 업로드 ID와 일치하는 경우 삭제 버튼을 표시합니다. */}
      {localStorage.getItem("jwt") &&
        product.upload_id === localStorage.getItem("userId") && (
          <button
            onClick={() => {
              // 상품 삭제를 위한 DELETE 요청을 보냅니다.
              axios
                .delete(`/api/product/${id}`)
                .then(() => {
                  alert("상품이 삭제되었습니다."); // 삭제 성공 메시지 표시
                  navigate("/board"); // 게시판으로 이동
                })
                .catch((error) => {
                  // 삭제 중 에러가 발생하면 콘솔에 에러 메시지를 출력합니다.
                  console.error("Error deleting product:", error);
                });
            }}
          >
            글삭제
          </button> // 삭제 버튼
        )}
    </div>
  );
};

export default Detail; // Detail 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
