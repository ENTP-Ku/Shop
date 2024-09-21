package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 나타내는 annotation

@Service // 이 클래스가 서비스 레이어의 컴포넌트임을 나타냄
public class UserService {
    
    @Autowired // UserRepository 의존성 주입
    private UserRepository userRepository;

    // 사용자 등록 메서드
    public User registerUser(User user) {
        return userRepository.save(user); // 사용자 정보를 저장하고 반환
    }
    
    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username); // Repository에서 존재 여부 확인
    }


    // 로그인 메서드
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username); // 사용자 이름으로 사용자 검색
        // 비밀번호 확인 로직 추가 (예: 비밀번호가 일치하는지 확인)
        return user; // 현재는 사용자 객체만 반환, 비밀번호 검증은 필요
    }
}
