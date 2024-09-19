import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Home 컴포넌트를 가져옴
// 나중에 다른 페이지도 추가할 수 있음

function App() {
  return (
    <Router>
      <Routes>
        {/* '/' 경로로 접근 시 Home 컴포넌트가 렌더링 됨 */}
        <Route path="/" element={<Home />} />
        {/* 추후 다른 페이지들도 아래와 같은 방식으로 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;

