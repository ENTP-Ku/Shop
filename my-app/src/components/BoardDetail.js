import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`/api/board/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error('Error fetching post details:', error));
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/board/${id}`);
            alert('게시물이 삭제되었습니다.');
            navigate('/board');
        } catch (error) {
            alert('게시물 삭제에 실패했습니다.');
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>작성자: {post.writer}</p>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default BoardDetail;
