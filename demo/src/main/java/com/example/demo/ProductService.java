package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 계층을 나타내기 위한 import

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List; // 리스트 자료형을 사용하기 위한 import
import java.util.Optional;


@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository; // ProductRepository를 주입받아 데이터 액세스를 담당

	// 모든 제품을 조회하는 메소드
	public List<Product> getAllProducts() {
		return productRepository.findAll(); // 모든 제품을 반환
	}

	// 새로운 제품을 생성하는 메소드
	public Product uploadProduct(String name, Integer price, String kind, List<MultipartFile> images) {
		Product newProduct = new Product();
		newProduct.setName(name);
		newProduct.setPrice(price);
		newProduct.setKind(kind);

		// 이미지 저장 경로 설정 (절대 경로)
		String absolutePath = "C:\\TeamManding\\demo\\src\\main\\resources\\static\\images\\"; // 절대경로

		// 이미지 저장 로직
		for (MultipartFile image : images) {
			if (!image.isEmpty()) {
				try {
					// 파일 이름 가져오기
					String fileName = image.getOriginalFilename();
					// 이미지 파일을 지정된 경로에 저장
					File destinationFile = new File(absolutePath + fileName); // 절대 경로 사용
					destinationFile.getParentFile().mkdirs(); // 부모 디렉토리 생성 (없을 경우)
					image.transferTo(destinationFile); // 파일 전송
					// 저장된 이미지 경로를 Product 객체에 설정 (여기서는 첫 번째 이미지 경로만 설정)
					newProduct.setImagePath("images/" + fileName); // 저장된 이미지 경로
				} catch (IOException e) {
					e.printStackTrace(); // 예외 처리
				}
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
	public List<Product> findTop5ByOrderByUploadDataDesc() {
		return productRepository.findTop5ByOrderByUploadDataDesc(); // 최신 5개 제품 반환
	}
}
