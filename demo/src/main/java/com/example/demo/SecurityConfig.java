package com.example.demo; // 패키지 선언

import org.springframework.context.annotation.Bean; // Bean을 정의하기 위한 import
import org.springframework.context.annotation.Configuration; // 구성 클래스를 정의하기 위한 import
import org.springframework.security.config.annotation.web.builders.HttpSecurity; // HTTP 보안 설정을 위한 import
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // 웹 보안 활성화를 위한 import
import org.springframework.security.web.SecurityFilterChain; // 보안 필터 체인을 위한 import

// Spring Security 구성을 위한 클래스
@Configuration
@EnableWebSecurity // Spring Security 기능을 활성화
public class SecurityConfig {

    // 보안 필터 체인을 설정하는 메소드
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // CSRF 보호 비활성화 (API의 경우 비활성화 가능)
            .authorizeRequests() // 요청에 대한 권한 설정
            .anyRequest().permitAll() // 모든 요청은 기본적으로 접근 허용
            .and()
            .httpBasic(); // 기본 HTTP 인증 사용 (또는 JWT 인증 방법 사용 가능)

        return http.build(); // 설정 완료 후 보안 필터 체인 반환
    }
}
