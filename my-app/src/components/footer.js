// footer.js
import React from "react"; // React 라이브러리 임포트
import { Link } from "react-router-dom"; // 라우팅을 위한 Link 컴포넌트 임포트
import "../styles/footer.css"; // CSS 스타일시트 연결

const Footer = () => {
  return (
    <footer className="footer"> {/* 푸터 영역 시작 */}
      <p>&copy; Amor. All rights reserved.</p> {/* 저작권 정보 표시 */}
      <ul className="footer-links"> {/* 링크 목록 시작 */}
        <li><Link to="/privacy">Privacy Policy</Link></li> {/* 개인정보 처리 방침 링크 */}
        <li><Link to="/terms">Terms of Service</Link></li> {/* 서비스 이용 약관 링크 */}
        <li><Link to="/help">Help</Link></li> {/* 도움말 링크 */}
      </ul> {/* 링크 목록 끝 */}
    </footer> // 푸터 영역 끝
  );
};

export default Footer; // Footer 컴포넌트 내보내기
