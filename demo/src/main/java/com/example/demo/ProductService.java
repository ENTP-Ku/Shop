package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 정의하기 위한 import

import java.util.List; // 리스트 자료형을 사용하기 위한 import

// 제품 관련 비즈니스 로직을 처리하는 서비스 클래스
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository; // ProductRepository에 대한 의존성 주입

    // 모든 제품을 조회하는 메소드
    public List<Product> getAllProducts() {
        return productRepository.findAll(); // 리포지토리에서 모든 제품을 반환
    }

    // 최근 등록된 5개의 제품을 조회하는 메소드
    public List<Product> getNewProducts() {
        return productRepository.findTop5ByOrderByUploadDataDesc(); // 최근 업로드된 5개 제품 반환
    }

    // 특정 종류의 제품을 조회하는 메소드
    public List<Product> getProductsByKind(String kind) {
        return productRepository.findByKind(kind); // 주어진 종류에 해당하는 제품 반환
    }

    // 새로운 제품을 업로드하는 메소드
    public Product uploadProduct(Product product) {
        return productRepository.save(product); // 제품을 리포지토리에 저장
    }

    // 특정 제품을 삭제하는 메소드
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId); // 제품 ID에 해당하는 제품 삭제
    }
}
