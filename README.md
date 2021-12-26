# 최저가 상품 구매 사이트 구축

## 구현 페이지 & 주요 기능

1. 회원가입 페이지  
   1-1. 필수 정보(이름, 아이디, 비밀번호) 입력 판단  
   1-2. 아이디 중복 검사
2. 로그인 페이지  
   2-1. 회원정보 비교 후 로그인 성공/실패 여부 판단
3. 리뷰 게시판 페이지  
   3-1. 내용/제목 기준 검색 기능  
   3-2. 게시글 추가, 수정, 조회 기능  
   3-3. 페이지 이동 기능
4. 상품 검색 페이지  
   4-1. 상품 검색 및 찜 목록 추가 기능  
   4-2. 페이지 이동 기능
5. 찜 목록 페이지  
   5-1. 카테고리 별 검색 기능  
   5-2. 장바구니 담기 및 찜 목록 삭제 기능  
   5-3. 수량 선택 기능
6. 장바구니 페이지  
   6-1. 장바구니 목록 조회 및 총 가격 조회  
   6-2. 결제정보 유효성 검사 및 결제 가능 여부 판단
7. 구매 내역 페이지  
   7-1. 전체 구매 데이터 시각화  
   7-2. 카테고리별 세부 구매 내역 조회  
   7-3. 결제 정보 및 상세 정보 조회  
   7-4. 기간별 결제 정보 검색 기능

## 세부 구현 내용

### 회원가입 페이지

1. 필수 정보 입력 판단
2. 아이디 중복 검사

### 로그인 페이지

1. 로그인 여부에 따른 페이지 접속 차단
2. 로그인 성공/실패 여부 판단

### 리뷰 게시판 페이지

1. 검색 기능
   > 검색시 페이지 기능 고장 (검색 API 호출시 검색 결과가 하나의 배열 데이터로 들어와 데이터의 양을 조절할 수 없다고 판단하여 해결책이 없다고 생각함)
2. 게시글 추가, 수정, 조회 기능
3. 페이지 이동 기능

### 상품 검색 페이지

> 이전 Toy Project의 내용과 동일

### 찜 목록 페이지

1. 카테고리별 검색 기능
2. 수량 선택 및 장바구니 담기
3. 찜목록 삭제

### 장바구니 페이지

1. 장바구니 목록 조회
2. 유효성 검사
   > 받는사람, 성함: 숫자 방지  
   > 전화번호, 카드번호: 문자 방지, 입력 갯수 제한  
   > 배송지 주소: 주소1(마지막 글자 시/도 판단), 주소3(마지막 글자 호 판단)  
   > 카드 선택: 카드 미선택 판단  
   > MM/YY: Month(문자 방지, 입력 01-12로 제한), Year(현재 년도보다 이전 년도 입력 제한)

### 구매내역 페이지

1. 구매 데이터 차트
   > 전체 구매데이터 시각화 및 카테고리별 상세 결과 조회
2. 세부 결제 내역 조회
3. 기간별 결제 내역 검색 기능
