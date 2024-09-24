package com.example.demo;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class YourSocketHandler extends SimpleChannelInboundHandler<String> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        // 클라이언트로부터 메시지를 수신했을 때의 처리
        System.out.println("Received message: " + msg);
        // 클라이언트에게 응답하기
        ctx.writeAndFlush("Echo: " + msg);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
