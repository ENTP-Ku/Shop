package com.example.demo;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String name;
    private Integer price;
    private String kind; // 'top' or 'bottom'
    private LocalDateTime uploadData;
    private Long uploadId; // User ID of the uploader
}
