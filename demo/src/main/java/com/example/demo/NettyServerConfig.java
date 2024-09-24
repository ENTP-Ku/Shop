package com.example.demo;

// Netty와 Spring 관련 클래스 임포트
import io.netty.bootstrap.ServerBootstrap; // 서버 부트스트랩을 위한 클래스
import io.netty.channel.ChannelFuture; // 채널 작업의 미래 결과를 나타내는 클래스
import io.netty.channel.ChannelInitializer; // 채널 초기화를 위한 클래스
import io.netty.channel.EventLoopGroup; // 이벤트 루프 그룹을 위한 클래스
import io.netty.channel.nio.NioEventLoopGroup; // NIO 이벤트 루프 그룹 클래스
import io.netty.channel.socket.SocketChannel; // 소켓 채널을 나타내는 클래스
import io.netty.channel.socket.nio.NioServerSocketChannel; // NIO 서버 소켓 채널 클래스
import jakarta.annotation.PostConstruct; // @PostConstruct 애너테이션을 위한 임포트
import org.springframework.context.annotation.Configuration; // @Configuration 애너테이션을 위한 임포트

@Configuration // 이 클래스가 Spring의 설정 클래스임을 나타냄
public class NettyServerConfig {

    @PostConstruct // 이 메서드는 Spring 컨테이너에 의해 빈이 초기화된 후 자동으로 호출됨
    public void startNettyServer() throws InterruptedException {
        // 보스와 워커 그룹을 생성하여 클라이언트 요청을 처리할 준비
        EventLoopGroup bossGroup = new NioEventLoopGroup(); // 클라이언트의 연결을 수신하는 그룹
        EventLoopGroup workerGroup = new NioEventLoopGroup(); // 수신된 클라이언트 요청을 처리하는 그룹
        
        try {
            // 서버 부트스트랩을 설정
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup) // 보스 그룹과 워커 그룹을 설정
                .channel(NioServerSocketChannel.class) // NIO 소켓 채널을 사용하여 비동기 처리를 지원
                .childHandler(new ChannelInitializer<SocketChannel>() { // 소켓 채널의 초기화 핸들러 설정
                    @Override
                    public void initChannel(SocketChannel ch) throws Exception {
                        // 새로운 소켓 채널이 생성될 때 호출되는 메서드
                        // 채널 파이프라인에 핸들러를 추가
                        ch.pipeline().addLast(new YourSocketHandler()); // 클라이언트의 요청을 처리할 핸들러 추가
                    }
                });

            // 서버를 지정된 포트(4000번)로 바인딩하고 동기적으로 대기
            ChannelFuture f = b.bind(4000).sync(); // bind() 메서드를 통해 포트에 바인딩
            System.out.println("Netty server started on port 4000"); // 서버 시작 메시지를 콘솔에 출력
            
            // 채널이 닫힐 때까지 대기
            f.channel().closeFuture().sync(); // 클라이언트의 연결이 종료될 때까지 대기
        } finally {
            // 서버가 종료될 때, 이벤트 루프 그룹을 안전하게 종료
            workerGroup.shutdownGracefully(); // 워커 그룹을 종료하여 자원을 해제
            bossGroup.shutdownGracefully(); // 보스 그룹을 종료하여 자원을 해제
        }
    }
}
