package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.security.crypto.password.PasswordEncoder; // PasswordEncoder import
import org.springframework.stereotype.Service; // 서비스 클래스를 나타내는 annotation

@Service // 이 클래스가 서비스 레이어의 컴포넌트임을 나타냄
public class UserService {
    
    @Autowired // UserRepository 의존성 주입
    private UserRepository userRepository;

    @Autowired // PasswordEncoder 의존성 주입
    private PasswordEncoder passwordEncoder;

    // 사용자 등록 메서드
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // 비밀번호 암호화
        return userRepository.save(user); // 사용자 정보를 저장하고 반환
    }

    // 로그인 메서드
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) { // 비밀번호 검증
            return user;
        }

        return null; // 비밀번호가 불일치하거나 사용자가 존재하지 않으면 null 반환
    }
}
