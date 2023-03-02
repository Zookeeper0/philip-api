# Getting Started
```bash
npx prisma genrate
/prisma/sql/init.sql 실행
npx prisma db push
```


# 리소스 생성
nest g resource

# 모듈 생성
## 코드를 체계적으로 유지하고 명확한 경계를 설정합니다(관련 구성 요소 그룹화)
nest g mo

# 컨트롤러
## 컨트롤러는 들어오는 요청 을 처리 하고 클라이언트에 응답 을 반환 하는 역할
## CRUD 경로(또는 GraphQL 애플리케이션의 쿼리/변형)를 정의
<pre><code>nest g co</code></pre>

# 서비스 생성
## 비즈니스 로직을 구현하고 격리
nest g s

# schema first getnerate typings
<pre><code>ts-node generate-typings</code></pre>
