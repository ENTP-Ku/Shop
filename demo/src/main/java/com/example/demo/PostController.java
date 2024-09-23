package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션 import
import org.springframework.http.ResponseEntity; // HTTP 응답을 나타내는 클래스 import
import org.springframework.web.bind.annotation.*; // RESTful 웹 서비스를 구축하기 위한 어노테이션 import

import java.time.LocalDateTime;
import java.util.List; // 리스트 자료형을 사용하기 위한 import

@RestController // RESTful 웹 서비스의 컨트롤러임을 나타내는 어노테이션
@RequestMapping("/api/posts") // API 엔드포인트 경로를 지정
public class PostController {
    
    @Autowired // PostService를 자동으로 주입
    private PostService postService;

    // 모든 게시글을 조회하는 GET 메소드
    @GetMapping 
    public List<Post> getAllPosts() {
        return postService.getAllPosts(); // 게시글 목록을 반환
    }

    // 새 게시글을 생성하는 POST 메소드
    @PostMapping 
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        post.setPostId("현재 사용자 ID"); // 현재 사용자 ID로 설정 (예: SecurityContext에서 가져오기)
        post.setPostData(LocalDateTime.now()); // 현재 날짜 및 시간으로 설정
        Post newPost = postService.createPost(post); 
        return ResponseEntity.ok(newPost); 
    }


    // 특정 게시글을 삭제하는 DELETE 메소드
    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id); // 게시글 삭제
        return ResponseEntity.noContent().build(); // 삭제 성공 시 204 No Content 응답 반환
    }
}
