package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository; // ProductRepository 추가

    // 모든 제품을 반환하는 GET 요청 처리
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // 새로운 제품 목록을 반환하는 GET 요청 처리
    @GetMapping("/new")
    public List<Product> getNewProducts() {
        return productService.getNewProducts();
    }

    @GetMapping("/id/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/kind/{kind}")
    public List<Product> getProductsByKind(@PathVariable String kind) {
        return productService.getProductsByKind(kind);
    }

 // 제품 업로드 처리 (JWT 검증 없이 구현)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> uploadProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("kind") String kind,
            @RequestParam("image") MultipartFile image,
            @RequestParam("uploadId") Long uploadId // 프론트에서 받은 업로더 ID
    ) {
        // 파일 크기 검사
        if (image.getSize() > 5 * 1024 * 1024) { // 5MB
            throw new RuntimeException("파일 크기가 너무 큽니다.");
        }

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setKind(kind);
        product.setUploadId(uploadId); // 업로더의 사용자 ID 설정
        product.setUploadDate(LocalDateTime.now()); // 현재 날짜 설정

        // 이미지 파일 처리
        if (image != null && !image.isEmpty()) {
            try {
                final String uploadDir = "C:\\TeamManding\\demo\\src\\main\\resources\\static\\images"; // 절대 경로
                String filePath = uploadDir + File.separator + image.getOriginalFilename();
                
                // 이미지 파일 저장
                image.transferTo(new File(filePath));
                
                // 이미지 경로를 Product 객체에 설정
                product.setImagePath("/images/" + image.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                // 예외 처리 추가 가능
            }
        }

        return ResponseEntity.ok(productService.saveProduct(product)); // 제품 저장
    }


    // 특정 ID의 제품을 삭제하는 DELETE 요청 처리
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
