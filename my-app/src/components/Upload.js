import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Upload.css'; // CSS 파일 연결

const Upload = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [kind, setKind] = useState('');
    
    // 3개의 파일을 관리하는 배열
    const [images, setImages] = useState([null, null, null]);

    // 파일 변경 시 호출되는 함수
    const handleFileChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const handleUpload = async () => {
        // 필드 유효성 검사
        if (!name || !price || !kind || images.some(image => !image)) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('kind', kind);
        
        // 각 이미지를 개별적으로 formData에 추가
        images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);  // `image1`, `image2`, `image3`로 저장
        });

        try {
            await axios.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('상품이 등록되었습니다.');
            navigate('/');
        } catch (error) {
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div className="upload-body"> {/* 전체 배경을 감싸는 컨테이너 */}
            <div className="upload-container"> {/* 클래스 추가 */}
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
                {/* 파일 업로드 필드 3개 */}
                {images.map((image, index) => (
                    <input 
                        key={index}
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                    />
                ))}
                <button onClick={handleUpload}>등록</button>
            </div>
        </div>
    );
};

export default Upload;
