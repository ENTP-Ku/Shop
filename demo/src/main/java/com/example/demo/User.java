package com.example.demo;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Data
public class User implements UserDetails { // UserDetails 인터페이스 구현
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 사용자 ID

    private String username; // 사용자 이름
    private String password; // 사용자 비밀번호
    private String uniqueNumber; // 고유 번호 (예: 회원가입 시 사용)

    @ElementCollection(fetch = FetchType.EAGER) // 권한 리스트를 EAGER로 로드
    private Collection<? extends GrantedAuthority> authorities; // 사용자의 권한

    // UserDetails 인터페이스의 메서드 구현
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정 만료 여부를 처리 (true로 설정하여 만료되지 않도록 설정)
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정 잠김 여부를 처리 (true로 설정하여 잠기지 않도록 설정)
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 비밀번호 만료 여부를 처리 (true로 설정하여 만료되지 않도록 설정)
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정 활성화 여부를 처리 (true로 설정하여 활성화 상태 유지)
    }
}
