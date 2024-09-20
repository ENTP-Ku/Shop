import React, { useState, useEffect } from 'react'; // React와 useState, useEffect 훅을 import합니다.
import { useParams, useNavigate } from 'react-router-dom'; // URL 파라미터와 페이지 내비게이션을 위한 훅을 import합니다.
import axios from 'axios'; // HTTP 요청을 처리하기 위해 axios 라이브러리를 import합니다.

const BoardDetail = () => {
    const { id } = useParams(); // URL에서 게시글 ID를 추출합니다.
    const navigate = useNavigate(); // useNavigate를 호출하여 페이지 이동 기능을 가져옵니다.
    const [post, setPost] = useState(null); // 게시글 정보를 저장할 상태 변수를 선언합니다. 초기값은 null입니다.

    // 컴포넌트가 처음 마운트될 때 실행되는 useEffect 훅
    useEffect(() => {
        // 해당 ID에 대한 게시글 정보를 가져오기 위해 GET 요청을 보냅니다.
        axios.get(`/api/board/${id}`)
            .then(response => {
                // 요청이 성공하면 응답 데이터(response.data)를 post 상태에 저장합니다.
                setPost(response.data);
            })
            .catch(error => {
                // 요청이 실패하면 콘솔에 에러 메시지를 출력합니다.
                console.error('Error fetching post details:', error);
            });
    }, [id]); // id가 변경될 때마다 이 효과가 실행됩니다.

    // 게시물 삭제 핸들러
    const handleDelete = async () => {
        try {
            // 해당 게시글을 삭제하기 위해 DELETE 요청을 보냅니다.
            await axios.delete(`/api/board/${id}`);
            alert('게시물이 삭제되었습니다.'); // 삭제 성공 메시지를 표시합니다.
            navigate('/board'); // 게시판 목록으로 이동합니다.
        } catch (error) {
            // 삭제 과정에서 에러가 발생하면 실패 메시지를 표시합니다.
            alert('게시물 삭제에 실패했습니다.');
        }
    };

    // post가 로드되기 전에는 로딩 메시지를 표시합니다.
    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1> {/* 게시글 제목을 표시합니다. */}
            <p>{post.content}</p> {/* 게시글 내용을 표시합니다. */}
            <p>작성자: {post.writer}</p> {/* 게시글 작성자를 표시합니다. */}
            <button onClick={handleDelete}>삭제</button> {/* 삭제 버튼 클릭 시 게시물 삭제 핸들러를 호출합니다. */}
        </div>
    );
};

export default BoardDetail; // BoardDetail 컴포넌트를 다른 파일에서 사용할 수 있도록 export합니다.
