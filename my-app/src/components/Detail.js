import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/product/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <img src={product.image} alt={product.name} style={{ margin: '20px' }} />
            <h1>{product.name}</h1>
            <p>{product.price} 원</p>
            <p>{product.kind}</p>
            <input type="number" placeholder="수량 선택" />
            <button>주문하기</button>

            {localStorage.getItem('jwt') && product.upload_id === localStorage.getItem('userId') && (
                <button onClick={() => {
                    axios.delete(`/api/product/${id}`)
                        .then(() => {
                            alert('상품이 삭제되었습니다.');
                            navigate('/board');
                        })
                        .catch(error => console.error('Error deleting product:', error));
                }}>글삭제</button>
            )}
        </div>
    );
};

export default Detail;
