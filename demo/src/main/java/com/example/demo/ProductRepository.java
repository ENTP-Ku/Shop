package com.example.demo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop5ByOrderByUploadDataDesc();
    List<Product> findByKind(String kind);
}
