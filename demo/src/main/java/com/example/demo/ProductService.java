package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime; // 날짜 및 시간 추가
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 이미지 저장 경로 설정
    private final String uploadDir = "C:\\TeamManding\\demo\\src\\main\\resources\\static\\images";

    // 모든 제품을 조회하는 메소드
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 최근 등록된 5개의 제품을 조회하는 메소드
    public List<Product> getNewProducts() {
        return productRepository.findTop5ByOrderByUploadDateDesc(); // 필드명 수정
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsByKind(String kind) {
        return productRepository.findByKind(kind);
    }

    // 제품 업로드 처리
    public Product uploadProduct(String name, Integer price, String kind, MultipartFile image, Long uploadId, LocalDateTime uploadDate) {
        // 파일 크기 검사
        if (image.getSize() > 5 * 1024 * 1024) { // 5MB
            throw new RuntimeException("파일 크기가 너무 큽니다.");
        }

        // 새로운 Product 객체 생성
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setKind(kind);
        product.setUploadId(uploadId); // 사용자 ID 저장
        product.setUploadDate(uploadDate); // 업로드 날짜 및 시간 저장

        // 이미지 파일 처리
        if (image != null && !image.isEmpty()) {
            try {
                // 이미지 파일을 저장할 경로 설정
                String filePath = uploadDir + File.separator + image.getOriginalFilename();
                
                // 이미지 파일 저장
                image.transferTo(new File(filePath));
                
                // 이미지 경로를 Product 객체에 설정 (웹에서 접근할 수 있는 경로)
                product.setImagePath("/images/" + image.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("이미지 저장 중 오류가 발생했습니다.");
            }
        }

        // 제품을 리포지토리에 저장하고 반환
        return saveProduct(product); // saveProduct 메소드 호출
    }

    // 제품을 리포지토리에 저장하는 메소드
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 특정 제품을 삭제하는 메소드
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
