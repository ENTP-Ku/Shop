package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 정의하기 위한 import
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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

    public Product getProductById(String id) {
        Long longId = Long.valueOf(id); // String을 Long으로 변환
        return productRepository.findById(longId).orElse(null);
    }





 // 클래스의 필드로 정의
    private final String uploadDir = "C:\\TeamManding\\demo\\src\\main\\resources\\static\\images"; // 이미지 저장 경로 설정

    public Product uploadProduct(String name, Integer price, String kind, MultipartFile image) {
        // 파일 크기 검사
        if (image.getSize() > 5 * 1024 * 1024) { // 5MB
            throw new RuntimeException("파일 크기가 너무 큽니다.");
        }

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setKind(kind);
        
        // 이미지 파일 처리
        if (image != null && !image.isEmpty()) {
            try {
                // 이미지 파일을 저장할 경로 설정
                String filePath = uploadDir + File.separator + image.getOriginalFilename();
                
                // 이미지 파일 저장
                image.transferTo(new File(filePath));
                
                // 이미지 경로를 Product 객체에 설정 (웹에서 접근할 수 있는 경로)
                product.setImagePath("/images/" + image.getOriginalFilename()); // 이 부분은 Product 클래스에 imagePath가 있어야 함
            } catch (IOException e) {
                e.printStackTrace();
                // 적절한 예외 처리 추가 가능
            }
        }

        return productRepository.save(product); // 제품을 리포지토리에 저장
    }




    // 특정 제품을 삭제하는 메소드
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId); // 제품 ID에 해당하는 제품 삭제
    }
}
