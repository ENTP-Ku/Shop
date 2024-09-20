package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getNewProducts() {
        return productRepository.findTop5ByOrderByUploadDataDesc();
    }

    public List<Product> getProductsByKind(String kind) {
        return productRepository.findByKind(kind);
    }

    public Product uploadProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
