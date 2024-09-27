package com.example.demo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "lastchat")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LastChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // 필드 이름 변경

    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
