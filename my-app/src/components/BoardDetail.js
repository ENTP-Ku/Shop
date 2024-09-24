import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import '../styles/BoardDetail.css'; // CSS 파일 import

const BoardDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [post, setPost] = useState(null); 

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
            });
    }, [id]); 

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${id}`);
            alert('게시물이 삭제되었습니다.');
            navigate('/board'); 
        } catch (error) {
            alert('게시물 삭제에 실패했습니다.');
        }
    };
    const handleCancellation = async () => {
        const confirmCancel = window.confirm('정말로 게시물을 삭제하시겠습니까?'); // 삭제 확인 대화상자
        if (!confirmCancel) {
            return; // 사용자가 취소를 누르면 삭제 취소
        }

        try {
            await axios.delete(`/api/posts/${id}`);
            alert('게시물이 삭제되었습니다.');
            navigate('/board'); 
        } catch (error) {
            alert('게시물 삭제에 실패했습니다.');
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="board-detail-container">
            <h1 className="board-detail-title">{post.postTitle}</h1> 
            <p className="board-detail-content">{post.postDetail}</p> 
            <p className="board-detail-meta">작성자: {post.postId} | 날짜: {post.postData}</p>
            <button className="delete-button" onClick={handleDelete}>삭제</button> 
            <button className="Cancellation-button" onClick={handleCancellation}>취소</button> 
        </div>
    );
};

export default BoardDetail; 
