import React, { useState } from 'react'; // React 및 useState 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // 페이지 내비게이션을 위한 useNavigate 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios를 import합니다.

const Upload = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
    // 상태 변수를 정의합니다: 상품명, 가격, 종류, 이미지
    const [name, setName] = useState(''); // 상품명 상태 초기화
    const [price, setPrice] = useState(''); // 가격 상태 초기화
    const [kind, setKind] = useState(''); // 종류 상태 초기화
    const [image, setImage] = useState(null); // 이미지 상태 초기화

    // 상품 등록 처리 함수
    const handleUpload = async () => {
        // 모든 필드가 입력되었는지 검증
        if (!name || !price || !kind || !image) {
            alert('모든 필드를 입력해주세요.'); // 입력 누락 시 알림
            return; // 함수 종료
        }

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('name', name); // 상품명 추가
        formData.append('price', price); // 가격 추가
        formData.append('kind', kind); // 종류 추가
        formData.append('image', image); // 이미지 추가

        try {
            // POST 요청을 통해 상품 등록 시도
            await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // 멀티파트 데이터 전송 헤더
            });
            alert('상품이 등록되었습니다.'); // 등록 성공 시 알림
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            alert('상품 등록에 실패했습니다.'); // 등록 실패 시 알림
        }
    };

    return (
        <div>
            <h1>상품 등록</h1>
            {/* 상품명 입력 필드 */}
            <input 
                type="text" 
                placeholder="상품명" 
                value={name} 
                onChange={(e) => setName(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            {/* 가격 입력 필드 */}
            <input 
                type="number" 
                placeholder="가격" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            {/* 종류 입력 필드 */}
            <input 
                type="text" 
                placeholder="종류" 
                value={kind} 
                onChange={(e) => setKind(e.target.value)} // 입력값 변경 시 상태 업데이트
            />
            {/* 이미지 파일 선택 필드 */}
            <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} // 파일 선택 시 상태 업데이트
            />
            {/* 상품 등록 버튼 */}
            <button onClick={handleUpload}>등록</button>
        </div>
    );
};

export default Upload; // Upload 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
