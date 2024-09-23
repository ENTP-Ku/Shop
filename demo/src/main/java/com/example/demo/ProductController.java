package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.ResponseEntity; // HTTP 응답 객체를 다루기 위한 import
import org.springframework.web.bind.annotation.*; // REST API 관련 어노테이션을 사용하기 위한 import
import org.springframework.web.multipart.MultipartFile;

import java.util.List; // 리스트 자료형을 사용하기 위한 import

// 제품과 관련된 API 요청을 처리하는 컨트롤러 클래스
@RestController
@RequestMapping("/api/products") // "/api/products" 경로에 대한 요청을 처리
public class ProductController {
    @Autowired // ProductService 의존성 주입
    private ProductService productService;

    // 모든 제품을 반환하는 GET 요청 처리
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts(); // 제품 서비스에서 모든 제품 조회
    }

    // 새로운 제품 목록을 반환하는 GET 요청 처리
    @GetMapping("/new")
    public List<Product> getNewProducts() {
        return productService.getNewProducts(); // 제품 서비스에서 새로운 제품 조회
    }

    @GetMapping("/id/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/api/products/kind/{kind}")
    public List<Product> getProductsByKind(@PathVariable String kind) {
        return productService.getProductsByKind(kind);
    }




    // 제품을 업로드하는 POST 요청 처리 (멀티파트 데이터 처리)
    @PostMapping(consumes = {"multipart/form-data"}) // 멀티파트 데이터 처리 명시
    public ResponseEntity<Product> uploadProduct(
            @RequestParam("name") String name, 
            @RequestParam("price") Integer price, 
            @RequestParam("kind") String kind, 
            @RequestParam("image") MultipartFile image) {

        // 파일을 포함한 데이터 처리 로직
        Product newProduct = productService.uploadProduct(name, price, kind, image);
        
        return ResponseEntity.ok(newProduct);
    }


    // 특정 ID의 제품을 삭제하는 DELETE 요청 처리
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id); // 제품 서비스에서 제품 삭제
        return ResponseEntity.noContent().build(); // 삭제 완료 응답 반환
    }
}
