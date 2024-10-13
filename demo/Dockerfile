# 베이스 이미지를 설정합니다.
FROM openjdk:17

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# JAR 파일을 복사합니다.
COPY target/*.jar app.jar


# 앱을 실행합니다.
ENTRYPOINT ["java", "-jar", "app.jar"]

# 기본 포트를 설정합니다.
EXPOSE 8080
