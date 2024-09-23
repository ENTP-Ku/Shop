import React, { useState, useEffect } from "react"; // React와 useState, useEffect 훅을 import합니다.
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 useNavigate 훅을 import합니다.
import axios from "axios"; // HTTP 요청을 처리하기 위해 axios 라이브러리를 import합니다.

const Board = () => {
  const navigate = useNavigate(); // useNavigate를 호출하여 페이지 이동 기능을 가져옵니다.
  const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태 변수를 선언합니다. 초기값은 빈 배열입니다.

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // '/api/board' API 엔드포인트로 GET 요청을 보내 게시글 데이터를 가져옵니다.
    axios
      .get("/api/posts")
      .then((response) => {
        // 요청이 성공하면 응답 데이터(response.data)를 posts 상태에 저장합니다.
        setPosts(response.data);
      })
      .catch((error) => {
        // 요청이 실패하면 콘솔에 에러 메시지를 출력하여 문제를 파악합니다.
        console.error("Error fetching board posts:", error);
      });
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  return (
    <div>
      <h1>게시판</h1> {/* 게시판 제목을 표시하는 h1 요소입니다. */}
      <button onClick={() => navigate("/write")}>글쓰기</button>{" "}
      {/* 글쓰기 버튼 클릭 시 '/write' 경로로 이동 */}
      <ul>
        {posts.map((post, index) => {
          console.log(post); // 각 게시글의 데이터를 확인합니다.
          return (
            <li key={index} onClick={() => navigate(`/boardDetail/${post.id}`)}>
              <h3>{post.postTitle}</h3>
              <p>{post.postData}</p>
              <p>작성자: {post.postId}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Board; // Board 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
