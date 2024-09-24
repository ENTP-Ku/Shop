import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import '../styles/Board.css'; // Board.css 경로를 설정

const Board = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
        .then(response => {
            // 게시글을 최근 날짜 순으로 정렬합니다.
            const sortedPosts = response.data.sort((a, b) => new Date(b.postData) - new Date(a.postData));
            setPosts(sortedPosts);
        })
        .catch(error => {
            console.error('Error fetching board posts:', error);
        });
}, []);

  const jwt = localStorage.getItem("jwt");

  return (
    <div className="board-container">
      <h1 className="board-title">게시판목록</h1>
      {jwt && (
        <button className="write-button" onClick={() => navigate("/write")}>
          글쓰기
        </button>
      )}
      <ul className="post-list">
        {posts.map((post, index) => {
          return (
            <li
              key={index}
              className="post-item"
              onClick={() => navigate(`/boardDetail/${post.id}`)}
            >
              <h3 className="post-title">{post.postTitle}</h3>
              <p className="post-author">작성자: {post.postId}</p>
              <p className="post-data">{post.postData}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Board;
