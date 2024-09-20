import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Write = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            await axios.post('/api/board', { title, content });
            alert('게시물이 등록되었습니다.');
            navigate('/board');
        } catch (error) {
            alert('게시물 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
};

export default Write;
