import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"; // 스타일 경로
import { jwtDecode } from "jwt-decode"; // 명명된 내보내기로 가져오기

const Home = () => {
    const [jwt, setJwt] = useState(null);
    const [username, setUsername] = useState("");
    const [products, setProducts] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/products").then((res) => setProducts(res.data));
    }, []);

    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        setJwt(storedJwt);

        if (storedJwt) {
            try {
                const payload = storedJwt.split(".")[1];
                const decodedPayload = JSON.parse(atob(payload));

                if (decodedPayload && decodedPayload.username) {
                    setUsername(decodedPayload.username);
                } else {
                    console.error("username not found in payload:", decodedPayload);
                }
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setJwt(null);
        setUsername("");
    };

    const handleCategoryClick = (kind) => {
        const url =
            kind === "new" ? "/api/products/new" : `/api/products/kind/${kind}`;
        axios.get(url).then((res) => setProducts(res.data));
    };

    const handleViewAll = () => {
        axios.get("/api/products").then((res) => setProducts(res.data));
    };

    const openChat = async () => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        const { username } = jwtDecode(token);

        if (username === "master") {
            // 최신 메시지를 저장하는 API 호출
            try {
                await axios.post('/chat/save-latest-messages');
                console.log("최신 메시지가 MasterChatList에 저장되었습니다.");
            } catch (error) {
                console.error("최신 메시지를 저장하는 중 오류 발생:", error);
            }

            window.open(
                "/chatML",
                "ChatMLWindow",
                "width=600,height=700,resizable=yes,scrollbars=yes"
            );
        } else {
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
                <h1>쇼핑몰</h1>
                <nav className="nav-container">
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => navigate("/board")} className="button">
                            게시판
                        </button>
                        {jwt && (
                            <button onClick={openChat} className="button">
                                스토어챗
                            </button>
                        )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {jwt ? (
                            <>
                                <span>안녕하세요, {username}</span>
                                <button
                                    onClick={() => navigate("/upload")}
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    상품 등록
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="button"
                                    style={{ marginLeft: "10px" }}
                                >
                                    로그인
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
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
                    style={{ backgroundColor: "#87CEEB", padding: "10px" }}
                >
                    <ul className="nav-list">
                        <li
                            onMouseEnter={() => setHoveredCategory("category")}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className="nav-list-item"
                        >
                            카테고리
                            {hoveredCategory === "category" && (
                                <ul className="dropdown-menu">
                                    <li onClick={() => handleCategoryClick("top")}>상의</li>
                                    <li onClick={() => handleCategoryClick("bottom")}>하의</li>
                                    <li>
                                        <a
                                            href="https://namu.wiki/w/%EA%B9%80%EC%A0%95%EC%9D%80"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            공산주의
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => handleCategoryClick("new")} className="nav-list-item">
                            신상품
                        </li>
                        <li onClick={handleViewAll} className="nav-list-item">
                            전체상품
                        </li>
                    </ul>
                </nav>
            </header>

            <div>
                <div className="grid-container">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/detail/${product.id}`)}
                            className="grid-item"
                        >
                            <img src={product.imagePath} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.price}원</p>
                            <p>{product.kind}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
