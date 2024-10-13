package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 계층을 나타내기 위한 import
import org.springframework.web.multipart.MultipartFile; // 파일 업로드를 위한 import

import java.io.File; // 파일 관련 import
import java.io.IOException; // IO 예외 처리 import
import java.time.LocalDateTime; // 날짜와 시간을 다루기 위한 import
import java.util.List; // 리스트 자료형을 사용하기 위한 import
import java.util.Optional; // Optional 클래스 import

//제품에 대한 비즈니스 로직을 처리하는 서비스 클래스
@Service
public class ProductService {

 @Autowired
 private UserService userService;

 @Autowired
 private ProductRepository productRepository;

 // 모든 제품을 조회하는 메소드
 public List<Product> getAllProducts() {
     return productRepository.findAll();
 }

 // 새로운 제품을 생성하는 메소드
 public Product uploadProduct(String name, Integer price, String kind, MultipartFile image, String uploaderId) {
     User uploader = userService.findByUsername(uploaderId);

     if (uploader == null) {
         System.out.println(uploaderId);
         System.out.println("Uploader is null");
         return null;
     }

     Product newProduct = new Product();
     newProduct.setName(name);
     newProduct.setPrice(price);
     newProduct.setKind(kind);
     newProduct.setUploadDate(LocalDateTime.now());
     newProduct.setUploaderId(uploader);

     String relativePath = "src/main/resources/static/images/";

     // 이미지 저장 로직
     if (image != null && !image.isEmpty()) {
         try {
             String fileName = image.getOriginalFilename();
             File destinationFile = new File(relativePath + fileName);
             destinationFile.getParentFile().mkdirs();
             image.transferTo(destinationFile);

             // 저장된 이미지 경로를 Product 객체에 설정
             newProduct.setImagePath("/images/" + fileName); // 이미지 접근 경로 설정
         } catch (IOException e) {
             e.printStackTrace();
         }
     }

     return productRepository.save(newProduct); // 제품 저장 및 반환
 }

 // 특정 ID의 제품을 삭제하는 메소드
 public void deleteProduct(Long productId) {
     productRepository.deleteById(productId);
 }

 // 특정 ID의 제품을 조회하는 메소드
 public Product getProductById(String id) {
     Optional<Product> optionalProduct = productRepository.findById(Long.valueOf(id));
     return optionalProduct.orElse(null);
 }

 // 특정 카테고리의 제품을 조회하는 메소드
 public List<Product> getProductsByKind(String kind) {
     return productRepository.findByKind(kind);
 }

 // 최신 5개 제품을 조회하는 메소드
 public List<Product> findTop5ByOrderByUploadDataDesc() {
     return productRepository.findTop5ByOrderByUploadDateDesc();
 }
}

