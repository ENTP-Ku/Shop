import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import axios from "axios"; 
import '../styles/Board.css'; // Board.css 경로를 설정

const Board = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 5; // 페이지당 표시할 게시글 수

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

  // 현재 페이지에 맞는 게시글 목록 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에 해당하는 게시글

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    // 페이지가 유효한 범위 내에서만 변경되도록 설정
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="board-container">

       <nav className="navbar"> {/* 네비게이션 시작 */}
      <div className="navbar-container">
        {/* 왼쪽 메뉴 */}
        <ul className="navbar-menu">
          <li>
            <Link to="/products">제품</Link>
          </li>
          <li>
            <Link to="/board">고객지원</Link>
          </li>        
        </ul>

        {/* 중앙 로고 */}
        <div className="navbar-logo">
          <Link to="/">Amor</Link>
        </div>

        {/* 오른쪽 메뉴 */}
        <ul className="navbar-icons">
          <li>
            <Link to="/search">
              <i className="fa fa-search"></i>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i>
              <span className="cart-count">{/* 장바구니 내 수량과 연결 */}</span>
            </Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/chat">채팅</Link>
          </li>
        </ul>
      </div>
    </nav>

      <h1 className="board-title">게시판</h1>
      {jwt && (
        <>
          <button className="write-button" onClick={() => navigate("/write")}>
            글쓰기
          </button>
          <button
            className="write-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back to Home"
          >
            홈으로가기
          </button>
        </>
      )}

      <ul className="post-list">
        {/* currentPosts를 사용하여 현재 페이지에 맞는 게시글만 표시 */}
        {currentPosts.map((post, index) => {
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

      <div className="pagination">
        {/* 이전 페이지로 이동 */}
        <button 
          className="page-button"
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          이전
        </button>

        {/* 페이지 번호 표시 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* 다음 페이지로 이동 */}
        <button 
          className="page-button" 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>

            {/* 푸터 */}
            <footer className="footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Board;
