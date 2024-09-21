package com.example.demo; // 패키지 선언

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // HTTP 응답을 표현하기 위한 import
import org.springframework.web.bind.annotation.*; // RESTful API 어노테이션을 위한 import

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

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
    
    // 사용자 ID 중복 체크 엔드포인트 추가
    @PostMapping("/check-username") // 사용자 ID 중복 체크 엔드포인트
    public ResponseEntity<Boolean> checkUsername(@RequestBody CheckUserRequest request) {
        String username = request.getUsername(); // DTO에서 username 추출
        boolean exists = userService.usernameExists(username); // 아이디 존재 여부 확인
        return ResponseEntity.ok(exists); // 존재하면 true, 아니면 false 반환
    }

    
 // 고유번호 중복 체크 엔드포인트 추가
    @PostMapping("/check-unique-number")
    public ResponseEntity<Boolean> checkUniqueNumber(@RequestBody CheckUserRequest request) {
        System.out.println("고유번호 중복확인 엔드포인트에 접근 성공!!!");
        boolean exists = userService.uniqueNumberExists(request.getUniqueNumber());
        return ResponseEntity.ok(exists);
    }





 // 사용자 로그인 엔드포인트
    @PostMapping("/login") // POST 요청을 처리
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getUsername(), user.getPassword()); // 로그인 서비스 호출
        if (loggedInUser != null) { // 로그인 성공 시
            // JWT 생성
            String token = Jwts.builder()
                .setSubject(loggedInUser.getId().toString()) // 사용자 ID를 주제로 설정
                .signWith(SignatureAlgorithm.HS256, "secretKey") // 비밀 키를 사용하여 서명
                .compact(); // JWT 생성 완료

            // 토큰과 사용자 정보를 포함한 응답 반환
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", loggedInUser);
            return ResponseEntity.ok(response); // 200 OK 응답
        } else {
            // 로그인 실패 시 문자열을 Map으로 래핑
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "로그인 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse); // 401 응답
        }
    }

}
