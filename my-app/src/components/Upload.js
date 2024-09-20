import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('상품이 등록되었습니다.');
            navigate('/');
        } catch (error) {
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>상품 등록</h1>
            <input type="text" placeholder="상품명" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="종류" value={kind} onChange={(e) => setKind(e.target.value)} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>등록</button>
        </div>
    );
};

export default Upload;
