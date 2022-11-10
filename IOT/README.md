## ※ Moomu IOT 설명서

### HW

- 라즈베리파이 모델 : Raspberry Pi 4 Computer Model B 4GB RAM
- gps 모듈 : **NT114990732**
- LAN : 와이파이 에그 이용
- Power : SRPB100-CP :: 5V 2A 10W 보조배터리 사용

### SW

- OS : Raspberry Pi OS(64-bit)
- gps.py : gps 데이터 처리 로직
    - Raspberry PI auto start를 통해 부팅시 실행.
- api.py : 백엔드 서버와 통신 파일
- requirements.txt : 파이썬 라이브러리
    - pip install -r requirements.txt
- mp3 : 각종 안내 음성 파일

### 주의사항

- 건물 실내에서는 터지지 않을 확률이 높습니다.