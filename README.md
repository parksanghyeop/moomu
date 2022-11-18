# SSAFY 자율프로젝트 B202 : MOOMU

# 목차

1. 웹서비스 소개
2. 기술 스택
3. 주요 기능
4. 프로젝트 아키텍쳐
5. 데모 영상
6. 팀원 소개

# 🚌**웹 서비스 소개**🚌

MooMu는 Raspberry Pi를 이용해 버스위치를 실시간으로 받아 사용자에게 실시간으로 버스 위치정보를 제공해주는 서비스입니다.

저희 서비스는 SSAFY 교육생을 위한 전용 셔틀정보 서비스로 다음과 같은

1. 실시간 조회를 통한 버스 위치 파악 가능

2. 승/하차 지점을 직접 선택해 효율적인 버스 운행

3. 관리자는 버스 노선 관리/변경을 지도를 이용하여 쉽게 가능

4. 버스가 정류장에 인접시 IoT에서 버스기사에게 안내방송 제공/ 사용자에게 Push알림

기능을 제공합니다.

# 🛠기술 스택🚌

## FrontEnd (WEB)

-   React 18.2
-   @reduxjs/toolkit 1.8.6
-   react-redux 8.0.4
-   React-Router-Dom 6.4.0
-   Redux 4.2.0
-   react-beautiful-dnd 13.1.1
-   Axios 1.1.3
-   daisyui 2.33.0
-   Node 16.16.0
-   npm 8.19.2

## FrontEnd (APP)

-   안드로이드 API : 29 ( OS 10버전)
-   React-Native: 0.69.6
-   ExpoCLI

## BackEnd

-   **FastAPI**
-   **JWT** 0.9.1
-   **MySQL** 8.0.30
-   **Redis** 0.7.2
-   **python** : 3.10 이상

## IoT Device

-   Raspberry Pi 4
-   GPS Module

## DevOps

-   **Docker** 20.10.17
-   **Jenkins** 2.361
-   **nginx** 1.18.0

# 🚌**EC2 포트 정리**🚌

| PORT | 이름           |
| ---- | -------------- |
| 3000 | HTTPS, nginx   |
| 3306 | MySQL          |
| 6349 | Redis          |
| 8080 | Jenkins        |
| 8000 | FastAPI Server |

# 🚌**주요 기능** 🚌

| 기능                       | 내용                                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 버스 실시간 위치 파악 기능 | 라즈베리파이 GPS모듈로 데이터의 평균값을 최종좌표로 결정해 Redis로 문자열을 전송해 사용자가 해당시간에 버스 지도 화면 접속시 Socket 서버와 연결한다. |
| 사용자 승/하차 노선 등록   | 정류장의 ScrollView를 이용해 해당 노선을 선택 한 후 변경완료를 누르면 변경된 정보를 서버로 요청해 변경된 값을 저장한다.                              |
| 버스 노선 표시             | 노선을 Polyline, 정류장은 Drag&Drop 방식으로 표기하고 노선 경로와 정류장위치를 랜더링 후 서버에 저장된 정류장 정보를 호출하여 마커로 표시한다.       |
| 버스 노선 시간/위치 수정   | 페이지 로드시 서버에 저장된 정류장 정보를 호출하고 마커 선택 시 StaticMap을 통해 이름, 도착 시간을 수정한다.                                         |

# 🚌프로젝트 아키텍쳐🚌

![00.png](img/image_89.png)

# 🚌개발 기간🚌

2022.10.11 ~ 2022.11.21

# 🚌팀원 소개🚌

| 이름 | 역할 | 개발 내용 |
| --- | --- | --- |
| 허유민 | FrontEnd(APP) & 팀장 | - 스플래쉬 화면 구현<br />  - 로그인 및 회원가입 화면 기능 구현 <br /> - 버스 조회 화면 기능 구현 <br />- 버스 노선 조회 화면 및 기능 구현<br />   - 사용자 승/하차 노선 등록 기능 구현<br />- 노선 지도 화면 및 기능 구현<br />   - 마커 및 버튼 표시 |
| 김구연 | FrontEnd(APP) | -공지사항 페이지 작성<br />-회원정보 수정란 페이지(지역, 이름, 반) 작성<br />-로그아웃 페이지 구현<br />-회원탈퇴 페이지 구현<br />-메인화면 컴포넌트 구성<br />-승/하차 사용자 노선 정보 받아오기<br />-회원가입시 지역정보, 닉네임 받아오기 |
| 김찬일 | FrontEnd(Web) | - React를 이용한 관리자 페이지 개발<br />- NaverMap API를 사용한 노선 지도, 커스텀 마커 표시<br />- NaverMap API를 사용한 노선의 전체 경로 탐색<br />- Redux toolkit을 활용한 변수의 전역관리<br />- 노선의 추가/ 변경/ 삭제 페이지 구현<br />- 공지사항의 작성 및 조회 페이지 구현<br />- 지역별 회원 조회 페이지 구현 |
| 박상협 | BackEnd(APP) | - 공지사항 CRUD API 구현<br />- 푸시알림 API 구현<br />- 건의사항 카카오 채널 연동 |
| 이길상 | BackEnd(API) & 배포 | - 백엔드 회원서비스 관련 API 설계 및 구현<br />- 프론트엔드 로그인/회원가입 화면 구현<br />- Docker&Jenkins 빌드 및 배포 관리<br />- nginx 및 https 설정 |
| 최종수 | BackEnd(API) & IOT | - FastAPI를 아용한 버스/정류장 API 구현<br />- FastAPI를 이용한 Socket 서버 구현<br />- 버스 실시간 위치를 위한 IOT 로직 구현<br />- 정류장 접근시 사용자에게 알람 로직 구현<br />- 지도에 버스 실시간 위치 마커 구현<br />- Client - Socket - IOT 연결 구현(with. Redis) |


🚌 팀 노션 바로가기 : [https://green-hardware-a67.notion.site/MOOMU-7786158cce3249bfad378ab06e691de9](https://www.notion.so/MOOMU-7786158cce3249bfad378ab06e691de9) 🚌
