package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위한 어노테이션 import
import org.springframework.http.ResponseEntity; // HTTP 응답을 표현하기 위한 클래스 import
import org.springframework.web.bind.annotation.*; // Spring MVC의 웹 어노테이션 import

import java.util.List; // List 컬렉션 사용을 위한 import

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequestMapping("/api/orders") // 이 컨트롤러의 기본 URL 경로를 "/api/orders"로 설정
public class OrderController {
    
    @Autowired // OrderService를 자동으로 주입
    private OrderService orderService; // 주문 서비스 인스턴스

    // 주문 생성 메소드
    @PostMapping // HTTP POST 요청을 처리
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // 전달된 주문 정보를 기반으로 새로운 주문을 생성
        Order newOrder = orderService.createOrder(order);
        // 생성된 주문 객체를 포함한 HTTP 200 OK 응답 반환
        return ResponseEntity.ok(newOrder);
    }

    // 사용자 ID에 따른 주문 조회 메소드
    @GetMapping("/user/{userId}") // 사용자 ID에 대한 GET 요청을 처리
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        // 특정 사용자 ID에 해당하는 주문 목록을 반환
        return orderService.getOrdersByUserId(userId);
    }
}
