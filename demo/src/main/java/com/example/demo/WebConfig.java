package com.example.demo; // 패키지 선언

import org.springframework.context.annotation.Configuration; // Spring의 Configuration annotation
import org.springframework.web.servlet.config.annotation.CorsRegistry; // CORS 설정을 위한 클래스
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Spring MVC 설정 인터페이스

@Configuration // 이 클래스가 Spring의 설정 클래스임을 나타냄
public class WebConfig implements WebMvcConfigurer {

    // CORS 매핑 추가
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 설정
                .allowedOrigins("http://localhost:3000") // React 앱의 URL (프론트엔드)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메소드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 인증 정보 허용
    }
}
