package com.example.demo; // 패키지 선언

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 나타내는 어노테이션 import

import java.util.List; // List 컬렉션 사용을 위한 import

// 주문과 관련된 비즈니스 로직을 처리하는 서비스 클래스
@Service // Spring의 서비스 컴포넌트로 등록
public class OrderService {
    
    @Autowired // OrderRepository의 의존성을 자동으로 주입
    private OrderRepository orderRepository;

    // 주문 생성 메소드
    public Order createOrder(Order order) {
        // 주문을 데이터베이스에 저장하고 저장된 주문을 반환
        return orderRepository.save(order);
    }

    // 사용자 ID에 따라 주문 목록을 가져오는 메소드
    public List<Order> getOrdersByUserId(Long userId) {
        // 주어진 사용자 ID에 해당하는 주문 목록을 반환
        return orderRepository.findByUserId(userId);
    }
}
