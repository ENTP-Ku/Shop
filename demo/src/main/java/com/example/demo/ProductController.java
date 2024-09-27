package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.ResponseEntity; // HTTP 응답 객체를 다루기 위한 import
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*; // REST API 관련 어노테이션을 사용하기 위한 import
import org.springframework.web.multipart.MultipartFile; // 파일 업로드를 위한 MultipartFile 클래스 import

import java.util.ArrayList;
import java.util.List; // 리스트 자료형을 사용하기 위한 import


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired // ProductService 의존성 주입
    private ProductService productService; // ProductService 클래스의 인스턴스를 자동으로 주입

    @Autowired
    private UserService userService; // UserService를 주입받아 사용자 관련 로직 처리



    // 모든 제품을 반환하는 GET 요청 처리
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts(); // 제품 서비스에서 모든 제품 조회 후 반환
    }

    // 새로운 제품 목록을 반환하는 GET 요청 처리
    @GetMapping("/new")
    public List<Product> getNewProducts() {
        return productService.findTop5ByOrderByUploadDataDesc(); // 제품 서비스에서 새로운 제품 조회 후 반환

    }

    // 특정 ID로 제품을 조회하는 GET 요청 처리
    @GetMapping("/id/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id); // 해당 ID의 제품을 조회 후 반환
    }

    // 특정 카테고리에 따라 제품 목록을 조회하는 GET 요청 처리
    @GetMapping("/kind/{kind}")
    public List<Product> getProductsByKind(@PathVariable String kind) {
        return productService.getProductsByKind(kind); // 해당 카테고리의 제품 목록을 조회 후 반환
    }

 // 제품 업로드를 처리하는 POST 요청
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> uploadProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("kind") String kind,
            @RequestParam(value = "image", required = false) MultipartFile image, // 단일 이미지로 변경
            @RequestParam("uploaderId") String uploaderId) { // 업로더 ID를 Long으로 변경

        // 새로운 제품 등록 (User 대신 uploaderId를 직접 사용)
        Product newProduct = productService.uploadProduct(name, price, kind, image, uploaderId);
        
        return ResponseEntity.ok(newProduct); // 새로운 제품 정보를 포함한 응답 반환
    }





    // 특정 ID의 제품을 삭제하는 DELETE 요청 처리
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id); // 제품 삭제
        return ResponseEntity.noContent().build(); // 삭제 완료 응답 반환 (204 No Content)
    }
}
