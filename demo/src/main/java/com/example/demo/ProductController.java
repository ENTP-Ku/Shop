package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.ResponseEntity; // HTTP 응답 객체를 다루기 위한 import
import org.springframework.web.bind.annotation.*; // REST API 관련 어노테이션을 사용하기 위한 import
import org.springframework.web.multipart.MultipartFile; // 파일 업로드를 위한 MultipartFile 클래스 import

import java.util.List; // 리스트 자료형을 사용하기 위한 import

@RestController // RESTful 웹 서비스의 컨트롤러임을 나타내는 어노테이션
@RequestMapping("/api/products") // 제품 관련 API 엔드포인트 경로 설정
public class ProductController {

    @Autowired // ProductService 의존성 주입
    private ProductService productService; // ProductService 클래스의 인스턴스를 자동으로 주입


    // 모든 제품을 반환하는 GET 요청 처리
    @GetMapping // /api/products 엔드포인트에 대한 GET 요청 처리
    public List<Product> getAllProducts() {
        return productService.getAllProducts(); // 제품 서비스에서 모든 제품 조회 후 반환
    }

    // 새로운 제품 목록을 반환하는 GET 요청 처리
    @GetMapping("/new") // /api/products/new 엔드포인트에 대한 GET 요청 처리
    public List<Product> getNewProducts() {
        return productService.findTop5ByOrderByUploadDateDesc(); // 제품 서비스에서 새로운 제품 조회 후 반환
    }

    // 특정 ID로 제품을 조회하는 GET 요청 처리
    @GetMapping("/id/{id}") // /api/products/id/{id} 엔드포인트에 대한 GET 요청 처리
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id); // 해당 ID의 제품을 조회 후 반환
    }

    // 특정 카테고리에 따라 제품 목록을 조회하는 GET 요청 처리
    @GetMapping("/kind/{kind}") // /api/products/kind/{kind} 엔드포인트에 대한 GET 요청 처리
    public List<Product> getProductsByKind(@PathVariable String kind) {
        return productService.getProductsByKind(kind); // 해당 카테고리의 제품 목록을 조회 후 반환
    }

    // 제품 업로드를 처리하는 POST 요청
    @PostMapping(consumes = {"multipart/form-data"}) // /api/products 엔드포인트에 대한 POST 요청 처리
    public ResponseEntity<Product> uploadProduct(
            @RequestParam("name") String name, // 제품 이름을 요청 파라미터로 받음
            @RequestParam("price") Integer price, // 제품 가격을 요청 파라미터로 받음
            @RequestParam("kind") String kind, // 제품 종류를 요청 파라미터로 받음
            @RequestParam(value = "image", required = false) MultipartFile image, // 단일 이미지 업로드 (필수 아님)
            @RequestParam("uploaderId") String uploaderId) { // 업로더 ID를 요청 파라미터로 받음

        // 새로운 제품 등록
        Product newProduct = productService.uploadProduct(name, price, kind, image, uploaderId);
        
        return ResponseEntity.ok(newProduct); // 새로운 제품 정보를 포함한 응답 반환
    }

    // 특정 ID의 제품을 삭제하는 DELETE 요청 처리
    @DeleteMapping("/{id}") // /api/products/{id} 엔드포인트에 대한 DELETE 요청 처리
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id); // 제품 삭제
        return ResponseEntity.noContent().build(); // 삭제 완료 응답 반환 (204 No Content)
    }
}
