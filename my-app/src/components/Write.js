import React, { useState, useEffect } from 'react'; // React 및 useState, useEffect 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.
import '../styles/Write.css'; // CSS 파일 연결
import "../styles/Detail.css"; // detail CSS 스타일시트 연결

const Write = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
    const [postTitle, setPostTitle] = useState(''); // 제목 상태 초기화
    const [postDetail, setPostDetail] = useState(''); // 내용 상태 초기화
    const [userId, setUserId] = useState(''); // 사용자 ID 상태 초기화

    useEffect(() => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt) {
            try {
                const payload = storedJwt.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
    
                // 'username' 필드에서 사용자 ID를 가져와서 설정
                if (decodedPayload && decodedPayload.username) {
                    setUserId(decodedPayload.username);
                }
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, []);
        
    const handleSubmit = async () => {
        // 제목과 내용이 모두 입력되었는지 검증
        if (!postTitle || !postDetail) {
            alert('제목과 내용을 입력해주세요.'); // 입력 누락 시 알림
            return; // 함수 종료
        }

        try {
            // POST 요청을 통해 게시물 등록 시도
            await axios.post('/api/posts', { postTitle, postDetail, postId: userId }); // 사용자 ID 추가
            alert('게시물이 등록되었습니다.'); // 등록 성공 시 알림
            navigate('/board'); // 게시판 페이지로 이동
        } catch (error) {
            alert('게시물 등록에 실패했습니다.'); // 등록 실패 시 알림
        }
    };

    return (
        <div className='form-container'>
            <h1 className='form-title'>문의글 작성</h1>
            
            
            <input className='input-field input-title'
                type="text" 
                placeholder="제목을 입력하세요" 
                value={postTitle} 
                onChange={(e) => setPostTitle(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            <textarea className='input-field textarea-content'
                placeholder="내용을 입력하세요" 
                value={postDetail} 
                onChange={(e) => setPostDetail(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            <div className="button-group">
            <button className='submit-button' onClick={handleSubmit}>등록</button>
            <button className="button back-button" onClick={() => window.history.back()}>뒤로가기</button>
            </div>
        </div>
    );
};

export default Write; // Write 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
