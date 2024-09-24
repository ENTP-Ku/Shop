import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Upload.css'; // CSS 파일 연결

const Upload = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [kind, setKind] = useState('');
    const [image, setImage] = useState(null);

    const handleUpload = async () => {
        if (!name || !price || !kind || !image) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('kind', kind);
        formData.append('image', image);

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
                <input 
                    type="text" 
                    placeholder="상품명" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="가격" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                />
                <select 
                    value={kind} 
                    onChange={(e) => setKind(e.target.value)} 
                >
                    <option value="">종류 선택</option>
                    <option value="top">상의</option>
                    <option value="bottom">하의</option>
                </select>
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                <button onClick={handleUpload}>등록</button>
            </div>
        </div>    
    );
};

export default Upload;
