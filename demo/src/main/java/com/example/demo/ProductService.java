package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List; // 리스트 자료형을 사용하기 위한 import
import java.util.Optional; // Optional 클래스 import

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// 제품에 대한 비즈니스 로직을 처리하는 서비스 클래스
@Service
public class ProductService {

    @Autowired
    private UserService userService; // UserService를 주입받아 사용자 관련 로직 처리
    @Autowired
    private ProductRepository productRepository; // ProductRepository를 주입받아 데이터 액세스를 담당

    // 모든 제품을 조회하는 메소드
    public List<Product> getAllProducts() {
        return productRepository.findAll(); // 모든 제품을 반환
    }

    // 새로운 제품을 생성하는 메소드
    public Product uploadProduct(String name, Integer price, String kind, MultipartFile image, String uploaderId) {
        // uploaderId로 사용자 조회
        User uploader = userService.findByUsername(uploaderId); // 사용자 조회 메소드 필요
        if (uploader == null) {
            System.out.println(uploaderId); // 업로더 ID 출력
            System.out.println("Uploader is null"); // 업로더가 존재하지 않을 경우 출력
            return null; // 업로더가 없을 경우 null 반환
        }

        // 새 제품 객체 생성 및 설정
        Product newProduct = new Product();
        newProduct.setName(name);
        newProduct.setPrice(price);
        newProduct.setKind(kind);
        newProduct.setUploadDate(LocalDateTime.now()); // 업로드 날짜 설정
        newProduct.setUploaderId(uploader); // 업로더 설정

      // 이미지 저장 경로 설정
        //String relativePath = "src/main/resources/static/images/"; // 상대 경로
        //String absolutePath = System.getProperty("user.dir") + "/" + relativePath; // 절대 경로
        String absolutePath = "/app/images/"; // 도커에서 마운트된 절대 경로로 수정


        // 이미지 저장 로직
        if (image != null && !image.isEmpty()) {
            try {
                // 파일 이름 가져오기
                String fileName = image.getOriginalFilename();
                // 이미지 파일을 지정된 경로에 저장
                File destinationFile = new File(absolutePath + fileName); // 절대 경로로 수정
                destinationFile.getParentFile().mkdirs(); // 부모 디렉토리 생성 (없을 경우)
                image.transferTo(destinationFile); // 파일 전송
                // 저장된 이미지 경로를 Product 객체에 설정
                newProduct.setImagePath("images/" + fileName); // 저장된 이미지 경로
            } catch (IOException e) {
                e.printStackTrace(); // 예외 처리
            }
        }  

        return productRepository.save(newProduct); // 제품을 저장하고 반환
    }

    // 특정 ID의 제품을 삭제하는 메소드
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId); // 제품을 ID로 삭제
    }

    // 특정 ID의 제품을 조회하는 메소드
    public Product getProductById(String id) {
        Optional<Product> optionalProduct = productRepository.findById(Long.valueOf(id)); // ID로 제품 검색
        return optionalProduct.orElse(null); // 제품이 존재하면 반환, 없으면 null 반환
    }

    // 특정 카테고리의 제품을 조회하는 메소드
    public List<Product> getProductsByKind(String kind) {
        return productRepository.findByKind(kind); // 카테고리로 제품 검색
    }

    // 최신 5개 제품을 조회하는 메소드
    public List<Product> findTop5ByOrderByUploadDateDesc() {
        return productRepository.findTop5ByOrderByUploadDateDesc(); // 최신 5개 제품 반환
    }
}
