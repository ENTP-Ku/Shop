import React, { useState, useEffect } from "react"; // React와 필요한 훅 임포트
import { useNavigate } from "react-router-dom"; // 내비게이션 훅 임포트
import axios from "axios"; // API 호출을 위한 axios 임포트
import "../styles/Home.css"; // 스타일 경로
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위한 명명된 내보내기로 가져오기

const Home = () => {
    const [jwt, setJwt] = useState(null); // JWT 상태 관리 (초기값은 null)
    const [username, setUsername] = useState(""); // 사용자 이름 상태 관리 (초기값은 빈 문자열)
    const [products, setProducts] = useState([]); // 제품 목록 상태 관리 (초기값은 빈 배열)
    const [hoveredCategory, setHoveredCategory] = useState(null); // 마우스 오버한 카테고리 상태 관리 (초기값은 null)
    const navigate = useNavigate(); // 내비게이션 훅 생성

    // 컴포넌트가 마운트될 때 API를 통해 제품 목록을 가져옴
    useEffect(() => {
        axios.get("http://localhost:8080/api/products").then((res) => setProducts(res.data));
    }, []); // 빈 배열로 effect가 한번만 실행되도록 설정

    // JWT를 로컬 스토리지에서 가져와서 사용자 이름을 설정
    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 가져오기
        setJwt(storedJwt); // JWT 상태 업데이트

        if (storedJwt) { // JWT가 존재할 경우
            try {
                const payload = storedJwt.split(".")[1]; // JWT의 페이로드 부분 추출
                const decodedPayload = JSON.parse(atob(payload)); // 페이로드 디코딩

                if (decodedPayload && decodedPayload.username) {
                    setUsername(decodedPayload.username); // 사용자 이름 상태 업데이트
                } else {
                    console.error("username not found in payload:", decodedPayload);
                }
            } catch (error) {
                console.error("Error decoding JWT:", error); // 디코딩 오류 로그
            }
        }
    }, []); // 빈 배열로 effect가 한번만 실행되도록 설정

    // 로그아웃 처리 함수
    const handleLogout = () => {
        localStorage.removeItem("jwt"); // 로컬 스토리지에서 JWT 제거
        setJwt(null); // JWT 상태 초기화
        setUsername(""); // 사용자 이름 상태 초기화
    };

    // 카테고리 클릭 시 해당 카테고리의 제품을 가져오는 함수
    const handleCategoryClick = (kind) => {
        const url =
            kind === "new" ? "http://localhost:8080/api/products/new" : `http://localhost:8080/api/products/kind/${kind}`;
        axios.get(url).then((res) => setProducts(res.data)); // 제품 데이터 상태 업데이트
    };

    // 모든 제품 보기 버튼 클릭 시 모든 제품을 가져오는 함수
    const handleViewAll = () => {
        axios.get("http://localhost:8080/api/products").then((res) => setProducts(res.data));
    };

    // 채팅창 열기 함수
    const openChat = async () => {
        const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 가져오기
        if (!token) return; // JWT가 없으면 종료

        const { username } = jwtDecode(token); // JWT 디코딩하여 사용자 이름 추출

        if (username === "master") { // 사용자가 'master'인 경우
            // 최신 메시지를 저장하는 API 호출
            try {
                await axios.post('http://localhost:8080/chat/save-latest-messages');
                console.log("최신 메시지가 MasterChatList에 저장되었습니다.");
            } catch (error) {
                console.error("최신 메시지를 저장하는 중 오류 발생:", error);
            }

            // MasterChatList 창 열기
            window.open(
                "/chatML",
                "ChatMLWindow",
                "width=600,height=700,resizable=yes,scrollbars=yes"
            );
        } else {
            // 일반 사용자 채팅창 열기
            window.open(
                `/chat?username=${username}`,
                "ChatWindow",
                "width=600,height=700,resizable=yes,scrollbars=yes"
            );
        }
    };

    return (
        <div>
            <header>
                <h1>쇼핑몰</h1> {/* 상단 제목 */}
                <nav className="nav-container"> {/* 내비게이션 컨테이너 */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => navigate("/board")} className="button">
                            게시판
                        </button>
                        {jwt && ( // JWT가 존재할 경우 스토어챗 버튼 표시
                            <button onClick={openChat} className="button">
                                스토어챗
                            </button>
                        )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {jwt ? ( // JWT가 존재하는 경우
                            <>
                                <span>안녕하세요, {username}</span> {/* 사용자 이름 표시 */}
                                <button
                                    onClick={() => navigate("/upload")} // 상품 등록 페이지로 이동
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    상품 등록
                                </button>
                                <button
                                    onClick={handleLogout} // 로그아웃 처리
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : ( // JWT가 없는 경우
                            <>
                                <button
                                    onClick={() => navigate("/login")} // 로그인 페이지로 이동
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    로그인
                                </button>
                                <button
                                    onClick={() => navigate("/register")} // 회원가입 페이지로 이동
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    회원가입
                                </button>
                            </>
                        )}
                    </div>
                </nav>
                <nav
                    className="nav-container"
                    style={{ backgroundColor: "#87CEEB", padding: "10px" }} // 배경색과 패딩 설정
                >
                    <ul className="nav-list"> {/* 내비게이션 리스트 */}
                        <li
                            onMouseEnter={() => setHoveredCategory("category")} // 마우스 오버 시 카테고리 설정
                            onMouseLeave={() => setHoveredCategory(null)} // 마우스 리브 시 카테고리 초기화
                            className="nav-list-item"
                        >
                            카테고리
                            {hoveredCategory === "category" && ( // 카테고리가 hovered 상태일 때 서브 메뉴 표시
                                <ul className="dropdown-menu">
                                    <li onClick={() => handleCategoryClick("top")}>상의</li>
                                    <li onClick={() => handleCategoryClick("bottom")}>하의</li>
                                    <li>
                                        <a
                                            href="https://namu.wiki/w/%EA%B9%80%EC%A0%95%EC%9D%80"
                                            target="_blank"
                                            rel="noopener noreferrer" // 새로운 탭에서 열기
                                        >
                                            공산주의
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => handleCategoryClick("new")} className="nav-list-item"> {/* 신상품 클릭 시 제품 로드 */}
                            신상품
                        </li>
                        <li onClick={handleViewAll} className="nav-list-item"> {/* 전체상품 클릭 시 제품 로드 */}
                            전체상품
                        </li>
                    </ul>
                </nav>
            </header>

            <div>
                <div className="grid-container"> {/* 제품 목록을 위한 그리드 컨테이너 */}
                    {products.map((product) => ( // 제품 배열을 순회하여 각 제품 표시
                        <div
                            key={product.id} // 각 제품의 고유 ID
                            onClick={() => navigate(`/detail/${product.id}`)} // 제품 클릭 시 상세 페이지로 이동
                            className="grid-item"
                        >
                            <img src={`http://localhost:8080/${product.imagePath}`} alt={product.name} /> {/* 제품 이미지 */}
                            <h3>{product.name}</h3> {/* 제품 이름 */}
                            <p>{product.price}원</p> {/* 제품 가격 */}
                            <p>{product.kind}</p> {/* 제품 종류 */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home; // Home 컴포넌트 내보내기
