FROM node:16

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 상위 디렉토리에서 package.json 및 package-lock.json 복사
COPY ../package.json ./
COPY ../package-lock.json ./

# npm 패키지 설치
RUN npm install

# 현재 디렉토리(src/components)에서 모든 파일 복사
COPY . .

# 소켓 서버 실행
CMD ["node", "Server.js"]
