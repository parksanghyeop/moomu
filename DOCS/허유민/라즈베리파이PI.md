# 라즈베리파이PI

라즈베리파이에 운영체제를 설치하는 과정

1. SD카드 포맷 및 운영체제 이미지 다운로드
2. 라즈베리파이에 SD카드 결합 및 부팅
3. 라즈비안이 약 3GB 정도 되기에 SD카드는 16이상으로 할 것

### 라즈비안(Raspbian)

[Raspberry Pi OS - Raspberry Pi](https://www.raspberrypi.com/software/)

### 첫 실행 시

![Untitled](images/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4PI%2055a3374c5ff24548a4351b4177a9d3b1/Untitled.png)

국가 선택을 한국으로 하게 되면 재시작 이후에 메뉴나 바탕 화면 휴지통 아이콘을 비롯한 모든 곳의 글자가 외계어로 깨져 보이는 현상이 있음

국가 선택시 Wi-Fi 주파수 신호 범위 설정도 함께 불러오는데 이로인해

라즈베리 파이3 혹은 이전 버전 파이의 Wi-Fi 칩셋에 대한 한국 지역 ‘주파수 범위’ 설정에 문제가 생길 수 있음

기본 암호는 : raspberry

### 한글 폰트와 입력기 설치

- sudo apt install fonts-nanum
- sudo apt install fcitx fcitx-hangul
- im-config -n fcitx
- 재부팅
- 설정에서 한글 키보드 추가

### 라즈베리파이 GPIO

![Untitled](images/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4PI%2055a3374c5ff24548a4351b4177a9d3b1/Untitled%201.png)

### Python 을 이용하여 GPIO 제어가능

- sudo apt-get install -y python-dev python-setuptools

```python
import RPi.GPIO as GPIO

# PIN 설정
led1 = 18 # P1 pin 12
led2 = 23 # P1 pin 16
btn = 17 # P1 pin 11

# GPIO 설정
GPIO.setmode(GPI,BCM) # 브로드컴 핀 넘버링으로 설정
GPIO.setup(led1,GPIO.OUT) # LED1에 사용할 18번 핀 OUTPUT으로 설정
GPIO.setup(led2,GPIO.OUT) # LED1에 사용할 23번 핀 OUTPUT으로 설정
GPIO.setup(btn, GPIO.IN, pull_up_down=GPIO.PUT_UP) # 버튼에 사용할 17번 핀 pull-up 저항

# GPIO 제어 시작
```

### GPS 모듈

- USB를 이용하여 연결하여 시리얼통신하여 받는 방법
- GPIO를 이용하여 좌표값을 받는 방법