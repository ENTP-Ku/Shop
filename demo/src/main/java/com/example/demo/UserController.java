package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.ResponseEntity; // HTTP 응답을 표현하기 위한 import
import org.springframework.web.bind.annotation.*; // RESTful API 어노테이션을 위한 import

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequestMapping("/api/users") // 기본 URL 경로 설정
public class UserController {
    
    @Autowired // UserService 의존성을 자동으로 주입
    private UserService userService;

    // 사용자 등록 엔드포인트
    @PostMapping("/register") // POST 요청을 처리
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user); // 사용자 등록 서비스 호출
        return ResponseEntity.ok(newUser); // 등록된 사용자 정보를 포함한 200 OK 응답 반환
    }

    // 사용자 로그인 엔드포인트
    @PostMapping("/login") // POST 요청을 처리
    public ResponseEntity<User> login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getUsername(), user.getPassword()); // 로그인 서비스 호출
        return ResponseEntity.ok(loggedInUser); // 로그인된 사용자 정보를 포함한 200 OK 응답 반환
    }
}
