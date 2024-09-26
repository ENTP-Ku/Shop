import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Board from './components/Board';
import Write from './components/Write';
import BoardDetail from './components/BoardDetail';
import Detail from './components/Detail';
import Chat from './components/Chat'; 
import ChatML from './components/ChatML'; 
import MChat from './components/MChat'; // MChat 컴포넌트 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<Write />} />
        <Route path="/boardDetail/:id" element={<BoardDetail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/chatML" element={<ChatML />} /> 
        <Route path="/mChat" element={<MChat />} /> {/* MChat 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
