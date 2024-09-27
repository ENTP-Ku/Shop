import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용하여 페이지 간의 링크를 생성
import axios from "axios"; // API 요청을 위한 axios 라이브러리 임포트
import '../styles/Board.css'; // CSS 파일을 임포트하여 스타일을 적용

const Board = () => {
  const navigate = useNavigate(); // 페이지 전환을 위한 navigate 훅 사용
  const [posts, setPosts] = useState([]); // 게시글 목록을 저장하기 위한 상태 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 추적하는 상태 변수
  const postsPerPage = 5; // 한 페이지에 표시할 게시글 수 설정

  // 컴포넌트가 마운트될 때 게시글 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts') // API로부터 게시글 데이터를 가져오는 GET 요청
      .then(response => {
          // 응답받은 데이터에서 게시글을 최신 순으로 정렬
          const sortedPosts = response.data.sort((a, b) => new Date(b.postData) - new Date(a.postData));
          setPosts(sortedPosts); // 정렬된 게시글 목록을 상태로 저장
      })
      .catch(error => {
          console.error('Error fetching board posts:', error); // 에러 발생 시 콘솔에 에러 메시지 출력
      });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

  const jwt = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 토큰을 가져옴

  // 현재 페이지에 맞는 게시글 목록을 계산
  const indexOfLastPost = currentPage * postsPerPage; // 현재 페이지에서 마지막 게시글의 인덱스 계산
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 현재 페이지에서 첫 번째 게시글의 인덱스 계산
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에 해당하는 게시글만 추출

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage); // 게시글 수를 페이지당 게시글 수로 나누어 올림 처리하여 총 페이지 수 계산

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    // 선택된 페이지 번호가 유효한 범위(1 ~ 총 페이지 수) 내에 있을 때만 페이지 변경
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // 선택된 페이지 번호로 상태 업데이트
    }
  };

  return (
    <div className="board-container"> {/* 게시판 전체 컨테이너 */}

      {/* 네비게이션 바 */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* 왼쪽 메뉴 */}
          <ul className="navbar-menu">
            <li>
              <Link to="/products">제품</Link> {/* 제품 페이지로 이동하는 링크 */}
            </li>
            <li>
              <Link to="/board">고객지원</Link> {/* 고객지원 게시판 페이지로 이동하는 링크 */}
            </li>        
          </ul>

          {/* 중앙 로고 */}
          <div className="navbar-logo">
            <Link to="/">Amor</Link> {/* 홈 페이지로 이동하는 링크 */}
          </div>

          {/* 오른쪽 메뉴 */}
          <ul className="navbar-icons">
            <li>
              <Link to="/search">
                <i className="fa fa-search"></i> {/* 검색 아이콘 */}
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i> {/* 장바구니 아이콘 */}
                <span className="cart-count">{/* 장바구니 아이콘 옆에 장바구니 아이템 수량 표시 */}</span>
              </Link>
            </li>
            <li>
              <Link to="/login">로그인</Link> {/* 로그인 페이지로 이동하는 링크 */}
            </li>
            <li>
              <Link to="/signup">회원가입</Link> {/* 회원가입 페이지로 이동하는 링크 */}
            </li>
            <li>
              <Link to="/chat">채팅</Link> {/* 채팅 페이지로 이동하는 링크 */}
            </li>
          </ul>
        </div>
      </nav>

      <h1 className="board-title">게시판</h1> {/* 게시판 제목 */}

      {/* JWT가 존재하는 경우 글쓰기 및 홈으로 가기 버튼 표시 */}
      {jwt && (
        <>
          <button className="write-button" onClick={() => navigate("/write")}>
            글쓰기 {/* 글쓰기 페이지로 이동하는 버튼 */}
          </button>
          <button
            className="write-back-button"
            onClick={() => navigate(-1)} // 이전 페이지로 돌아가는 버튼
            aria-label="Go back to Home" // 접근성을 위한 설명 추가
          >
            홈으로가기
          </button>
        </>
      )}

      {/* 게시글 목록 표시 */}
      <ul className="post-list">
        {/* 현재 페이지에 해당하는 게시글만 표시 */}
        {currentPosts.map((post, index) => {
          return (
            <li
              key={index} // 각 게시글 항목의 고유 키 설정
              className="post-item"
              onClick={() => navigate(`/boardDetail/${post.id}`)} // 게시글 클릭 시 해당 게시글의 상세 페이지로 이동
            >
              <h3 className="post-title">{post.postTitle}</h3> {/* 게시글 제목 */}
              <p className="post-author">작성자: {post.postId}</p> {/* 게시글 작성자 ID */}
              <p className="post-data">{post.postData}</p> {/* 게시글 작성 날짜 */}
            </li>
          );
        })}
      </ul>

      {/* 페이지네이션 섹션 */}
      <div className="pagination">
        {/* 이전 페이지로 이동하는 버튼 */}
        <button 
          className="page-button"
          onClick={() => paginate(currentPage - 1)} // 현재 페이지에서 -1 페이지로 이동
          disabled={currentPage === 1} // 현재 페이지가 1일 경우 버튼 비활성화
        >
          이전
        </button>

        {/* 페이지 번호 표시 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} // 각 페이지 번호의 고유 키 설정
            className={`page-number ${currentPage === index + 1 ? 'active' : ''}`} // 현재 페이지는 active 클래스로 강조
            onClick={() => paginate(index + 1)} // 클릭 시 해당 페이지로 이동
          >
            {index + 1} {/* 페이지 번호 출력 */}
          </button>
        ))}

        {/* 다음 페이지로 이동하는 버튼 */}
        <button 
          className="page-button" 
          onClick={() => paginate(currentPage + 1)} // 현재 페이지에서 +1 페이지로 이동
          disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지일 경우 버튼 비활성화
        >
          다음
        </button>
      </div>

      {/* 푸터 섹션 */}
      <footer className="footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p> {/* 저작권 정보 */}
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li> {/* 개인정보처리방침 페이지로 이동하는 링크 */}
          <li><Link to="/terms">Terms of Service</Link></li> {/* 서비스 이용약관 페이지로 이동하는 링크 */}
          <li><Link to="/help">Help</Link></li> {/* 도움말 페이지로 이동하는 링크 */}
        </ul>
      </footer>
    </div>
  );
};

export default Board; // Board 컴포넌트를 내보냄
