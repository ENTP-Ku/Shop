# 베이스 이미지를 설정합니다.
FROM node:16

# 작업 디렉토리를 설정합니다.
WORKDIR /usr/src/app

# 의존성 파일들을 복사하고 설치합니다.
COPY package*.json ./
RUN npm install

# 소스 코드를 복사합니다.
COPY . .

# 앱을 빌드합니다.
RUN npm run build

# 앱을 구동합니다.
CMD ["npm", "start"]

# 기본 포트를 설정합니다.
EXPOSE 3000
