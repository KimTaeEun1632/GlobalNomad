<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=GlobalNomad%20Team17&fontSize=50&fontAlignY=40" />

# GlobalNomad
> 팀프로젝트 <br>
> 개발기간: 2024.05.18 ~ 2024.06.26

# 배포주소
> https://team17-globalnomad.vercel.app/

# 팀원소개
<table>
    <tr>
    <td height="160px" align="center"><a href="https://github.com/RyuGwangHyeon"><img src="https://avatars.githubusercontent.com/u/155417957?v=4" width="160px"/><br/>류광현</a></td> 
    <td height="160px" align="center"><a href="https://github.com/KimTaeEun1632"><img src="https://avatars.githubusercontent.com/u/155213331?v=4" width="160px"/><br/>김태은</a></td> 
    <td height="160px" align="center"><a href="https://github.com/rlghks1490"><img src="https://avatars.githubusercontent.com/u/82919729?v=4" width="160px"/><br/>박기환</a></td> 
    <td height="160px" align="center"><a href="https://github.com/jinah-dev"><img src="https://avatars.githubusercontent.com/u/155082326?v=4" width="160px"/><br/>김진아</a></td>
  </tr>
</table>

# 프로젝트 소개 
사람들은 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민들 하게 됩니다. <br>
'글로벌노마드'는 바쁜 현대인의 이런 고민들을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스 입니다.

# 시작 가이드

### 1. 저장소 클론
```bash
git clone https://github.com/KimTaeEun1632/GlobalNomad.git
cd GlobalNomad
```

### 2.Node.js 버전 설정 (nvm 사용 시)
```bash
nvm use 20.12.1
```

### 3. 의존성 설치 및 실행
```bash
npm install
npm run dev
```
---
# 📚 STACKS
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
</p>

# 🔎 미리보기

| 메인 페이지 | 메인 페이지(2) | 로그인 페이지 |
|-------------|--------------|----------------|
| ![메인 페이지](https://github.com/user-attachments/assets/cdfa53bc-1660-4e72-8483-a4b6779e5207) | ![메인 페이지(2)](https://github.com/user-attachments/assets/4640fe09-602b-4d36-a09f-9a5e8931f03a) | ![로그인 페이지](https://github.com/user-attachments/assets/7e8e1a3b-721c-41ce-90ec-54e765473c78) |

| 내 정보 | 예약내역 | 예약 현현 | 내 정보 | 
|----------------|-------------|-------------| -------------|
| ![내 정보](https://github.com/user-attachments/assets/f4b0544b-b009-4b90-920e-c9c6a9014a90) | ![예약내역](https://github.com/user-attachments/assets/c661d74f-97a8-4800-88f7-eb1d9290e309) | ![예약 현황](https://github.com/user-attachments/assets/b1f6a8e1-5dc1-4b80-b285-bf31e68843ba) | ![내 정보](https://github.com/user-attachments/assets/0b01361c-3d09-4e8f-95c9-5c8eef1f977e) |

> **Tip**  
> 클릭하면 원본 크기로 크게 볼 수 있어요!  


- **프로젝트 내용**
  - 사용자는 로그인 하고 원하는 체험을 인원 날짜를 선택하여 신청할 수 있습니다.
  - 사용자는 마이페이지 - 내 체험 관리에서 체험을 등록하고 삭제 할 수 있습니다.
  - 예약 현황 페이지에서 다른 사용자가 신청한 예약신청을 수락, 거절 할 수 있습니다.
  - 문화, 예술, 식음료, 스포츠, 투어 등 카테고리 별로 체험을 확인 할 수 있고, 체험 상품 클릭시 체험 내용, 장소, 가격 등을 자세히 알 수 있습니다.

## 주요기능

| ⭐️체험 등록 |||
|-------------|-------------|-------------|
| ![체험 등록](https://github.com/user-attachments/assets/a1aa59bc-180f-40b5-a61b-f344bba07644) | ![체험 등록](https://github.com/user-attachments/assets/908d79e6-b15f-4404-9bb0-e04635096a44) | ![체험 등록](https://github.com/user-attachments/assets/c092fb40-a1a0-4220-a235-f49a17922b9e) |

| ⭐️예약하기 |
|-------------|
| ![예약하기](https://github.com/user-attachments/assets/516cb8a9-daf6-40fd-91a7-6d1da73b3726) |

# 파일 구조
```
team17-globalnomad
 ┣ pages
 ┃ ┣ activity-details # 체험상세
 ┃ ┃ ┗ [id]
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┣ api # Auth.js 인증 로직
 ┃ ┃ ┗ auth
 ┃ ┃ ┃ ┣ next-auth.d.ts
 ┃ ┃ ┃ ┗ [...nextauth].ts
 ┃ ┣ auth # 로그인, 회원가입
 ┃ ┃ ┣ sign-in
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┃ ┗ sign-up
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┣ my-page # 마이페이지
 ┃ ┃ ┣ activities
 ┃ ┃ ┃ ┣ [activityId]
 ┃ ┃ ┃ ┃ ┗ edit.tsx
 ┃ ┃ ┃ ┣ index.tsx
 ┃ ┃ ┃ ┗ register.tsx
 ┃  |  ┣ reservation-status
 ┃ ┃ ┃ ┗ index.tsx
 ┃  |  ┣ reservations
 ┃ ┃ ┃ ┣ [id]
 ┃ ┃ ┃ ┃ ┗ index.tsx
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┗ index.tsx
 ┃ ┣ 404.tsx
 ┃ ┣ index.tsx # 메인페이지
 ┃ ┣ _app.tsx
 ┃ ┗ _document.tsx
 ┣ public
 ┃ ┣ fonts
 ┃ ┣ icons // svg 파일
 ┃ ┗ images // png 파일
 ┣ src
 ┃ ┣ Components
 ┃ ┃ ┣ ActivityDetails
 ┃ ┃ ┣ ActivityEdit
 ┃ ┃ ┣ ActivityRegist
 ┃ ┃ ┣ Button
 ┃ ┃ ┣ Common
 ┃ ┃ ┣ Footer
 ┃ ┃ ┣ Input
 ┃ ┃ ┣ MainPage
 ┃ ┃ ┣ Modal
 ┃ ┃ ┣ MyActivities
 ┃ ┃ ┣ MyPage
 ┃ ┃ ┣ MyReservation
 ┃ ┃ ┣ ProfileModify
 ┃ ┃ ┣ ReservationStatus
 ┃ ┃ ┗ Toast
 ┃ ┣ constants # 메타태그, 로그인 input validate 정리
 ┃ ┣ hooks
 ┃ ┃ ┣ hook.tsx
 ┃ ┃ ┣ useKakaoMap.tsx
 ┃ ┃ ┗ useModal.ts
 ┃ ┣ layouts
 ┃ ┣ service
 ┃ ┃ ┣ activities # 체험목록 api
 ┃ ┃ ┣ auth # 로그인, 회원 가입 api 
 ┃ ┃ ┣ myActivities # 내 체험관리 api
 ┃ ┃ ┣ myNotifications # 내 예약현황 api
 ┃ ┃ ┣ myReservations # 내 예약내역 api
 ┃ ┃ ┣ users # 내 정보 api
 ┃ ┃ ┗ requestor.ts # axios api 요청 통합 관리
 ┃ ┗ styles
 ┃ ┃ ┗ globals.css
 ┣ middleware.tsx
 ┗ tailwind.config.js
 ```
