package com.example.demo;

// Netty의 채널 핸들러 관련 클래스 임포트
import io.netty.channel.ChannelHandlerContext; // 채널 핸들러의 컨텍스트를 나타내는 클래스
import io.netty.channel.SimpleChannelInboundHandler; // 단순한 채널 인바운드 핸들러 클래스

// 클라이언트로부터 수신된 문자열 메시지를 처리하기 위한 핸들러 클래스
public class YourSocketHandler extends SimpleChannelInboundHandler<String> {

    // 클라이언트로부터 메시지를 수신했을 때 호출되는 메서드
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        // 수신된 메시지를 콘솔에 출력
        System.out.println("Received message: " + msg);
        
        // 클라이언트에게 수신한 메시지를 에코하여 응답
        ctx.writeAndFlush("Echo: " + msg); // "Echo: "라는 접두사를 붙여 클라이언트에게 반환
    }

    // 예외 발생 시 호출되는 메서드
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // 예외 스택 트레이스를 콘솔에 출력
        cause.printStackTrace();
        
        // 문제를 해결하기 위해 채널을 닫음
        ctx.close(); // 클라이언트와의 연결을 종료
    }
}
