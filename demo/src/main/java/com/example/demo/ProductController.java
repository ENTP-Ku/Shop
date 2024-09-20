package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/new")
    public List<Product> getNewProducts() {
        return productService.getNewProducts();
    }

    @GetMapping("/kind/{kind}")
    public List<Product> getProductsByKind(@PathVariable String kind) {
        return productService.getProductsByKind(kind);
    }

    @PostMapping
    public ResponseEntity<Product> uploadProduct(@RequestBody Product product) {
        Product newProduct = productService.uploadProduct(product);
        return ResponseEntity.ok(newProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
