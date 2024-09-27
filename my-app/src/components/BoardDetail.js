import React, { useState, useEffect } from 'react'; // React 및 상태 관리와 생명주기 훅 임포트
import { useParams, useNavigate } from 'react-router-dom'; // URL 파라미터와 네비게이션을 위한 훅 임포트
import axios from 'axios'; // API 요청을 위한 axios 임포트
import '../styles/BoardDetail.css'; // 게시글 상세 페이지 스타일 시트 임포트
import "../styles/Detail.css"; // 추가적인 스타일 시트 임포트

const BoardDetail = () => {
    const { id } = useParams(); // URL에서 게시글 ID를 추출
    const navigate = useNavigate(); // 페이지 전환을 위한 navigate 훅 사용
    const [post, setPost] = useState(null); // 게시글 데이터를 저장하기 위한 상태 변수

    // 컴포넌트가 마운트될 때 게시글 상세 데이터를 가져오는 useEffect 훅
    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${id}`) // 게시글 ID에 해당하는 API 요청
            .then(response => {
                setPost(response.data); // 응답받은 게시글 데이터를 상태로 설정
            })
            .catch(error => {
                console.error('Error fetching post details:', error); // 에러 발생 시 콘솔에 에러 출력
            });
    }, [id]); // id가 변경될 때마다 이 effect가 실행됨

    // 게시물 삭제 핸들러
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`); // 게시글 삭제 요청
            alert('게시물이 삭제되었습니다.'); // 성공 메시지 출력
            navigate('/board'); // 게시판 페이지로 이동
        } catch (error) {
            alert('게시물 삭제에 실패했습니다.'); // 에러 발생 시 메시지 출력
        }
    };

    // 이전 페이지로 돌아가는 핸들러
    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    // 게시글 데이터가 로딩 중일 때 표시할 내용
    if (!post) return <div>Loading...</div>; // 데이터가 로딩 중일 경우 'Loading...' 표시

    return (
        <div className="board-detail-container"> {/* 게시글 상세 컨테이너 */}
            <h1 className="board-detail-title">{post.postTitle}</h1> {/* 게시글 제목 표시 */}
            <p className="board-detail-content">{post.postDetail}</p> {/* 게시글 내용 표시 */}
            <p className="board-detail-meta">작성자: {post.postId} | 날짜: {post.postData}</p> {/* 작성자 및 날짜 표시 */}
            <button className="delete-button" onClick={handleDelete}>삭제</button> {/* 삭제 버튼 */}
            <button className="back-button" onClick={handleGoBack}>뒤로가기</button> {/* 뒤로가기 버튼 */}
        </div>
    );
};

export default BoardDetail; // BoardDetail 컴포넌트를 내보냄
