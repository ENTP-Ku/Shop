import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Board = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/board')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching board posts:', error));
    }, []);

    return (
        <div>
            <h1>게시판</h1>
            <button onClick={() => navigate('/write')}>글쓰기</button>
            <ul>
                {posts.map((post, index) => (
                    <li key={index} onClick={() => navigate(`/boardDetail/${post.id}`)}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>작성자: {post.writer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Board;
