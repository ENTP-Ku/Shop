package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 계층을 나타내기 위한 import

import java.util.List; // 리스트 자료형을 사용하기 위한 import

// 게시글에 대한 비즈니스 로직을 처리하는 서비스 클래스
@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository; // PostRepository를 주입받아 데이터 액세스를 담당

    // 모든 게시글을 조회하는 메소드
    public List<Post> getAllPosts() {
        return postRepository.findAll(); // 모든 게시글을 반환
    }

    // 새로운 게시글을 생성하는 메소드
    public Post createPost(Post post) {
        return postRepository.save(post); // 게시글을 저장하고 반환
    }

    // 특정 ID의 게시글을 삭제하는 메소드
    public void deletePost(Long postId) {
        postRepository.deleteById(postId); // 게시글을 ID로 삭제
    }
}
