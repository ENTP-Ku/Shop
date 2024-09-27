package com.example.demo; // 패키지 선언

import org.springframework.boot.SpringApplication; // Spring Boot 애플리케이션 실행을 위한 import
import org.springframework.boot.autoconfigure.SpringBootApplication; // Spring Boot 자동 설정을 위한 import

// Spring Boot 애플리케이션의 메인 클래스
@SpringBootApplication // 이 어노테이션으로 Spring Boot의 자동 설정과 컴포넌트 스캔을 활성화
public class ShoppingMallApplication {

    // 애플리케이션의 진입점
    public static void main(String[] args) {
        // Spring Boot 애플리케이션 실행
        SpringApplication.run(ShoppingMallApplication.class, args);
    }

}
