import React, { useState } from 'react'; // React 및 useState 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Write = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
    // 상태 변수를 정의합니다: 제목과 내용
    const [title, setTitle] = useState(''); // 제목 상태 초기화
    const [content, setContent] = useState(''); // 내용 상태 초기화

    // 게시물 등록 처리 함수
    const handleSubmit = async () => {
        // 제목과 내용이 모두 입력되었는지 검증
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요.'); // 입력 누락 시 알림
            return; // 함수 종료
        }

        try {
            // POST 요청을 통해 게시물 등록 시도
            await axios.post('/api/board', { title, content });
            alert('게시물이 등록되었습니다.'); // 등록 성공 시 알림
            navigate('/board'); // 게시판 페이지로 이동
        } catch (error) {
            alert('게시물 등록에 실패했습니다.'); // 등록 실패 시 알림
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            {/* 제목 입력 필드 */}
            <input 
                type="text" 
                placeholder="제목" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            {/* 내용 입력 필드 (textarea) */}
            <textarea 
                placeholder="내용" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            {/* 게시물 등록 버튼 */}
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
};

export default Write; // Write 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
