from re import I
import serial
import redis
import time
import traceback

global lat_q, lng_q
lat_q = [0] * 5
lng_q = [0] * 5

def redis_connect():
    try:
        global r
        r = redis.Redis(host="k7b202.p.ssafy.io", port=6379, db=0)
    except Exception:
        print(traceback.format_exc())

def SER_connect():
    while True:
        try:
            global SER
            SER = serial.Serial('/dev/ttyUSB0', 9600)
            time.sleep(3)
            print("connect Success")
            break
        except:
            continue

def get_lat_lng():
    global gpiostr, lat_decode, lng_decode
    gpiostr = ""
    while True:
        try:
            bytes = SER.read()
        except:
            continue
        decode_bytes = str(bytes, 'utf-8')
        if decode_bytes == "$":
            gpiostr = ""
        gpiostr = gpiostr + decode_bytes
        if decode_bytes == '\r':
            if gpiostr.startswith("$GPGGA"):
                gpiostr_string = gpiostr.split(',')
                lat = gpiostr_string[2]
                lng = gpiostr_string[4]
                if lat == "" or lng == "":
                    continue
                lat_decode = int(lat[0:2]) + int(lat[2:4])/60 + (int(lat[5:])/10000)/60 
                lng_decode = int(lng[0:3]) + int(lng[3:5])/60 + (int(lng[6:])/10000)/60 
                break

def get_avg(i: int):
    global lat_avg, lng_avg
    lat_q[i] = lat_decode
    lng_q[i] = lng_decode
    a = 0
    lat_sum = 0
    lng_sum = 0
    for j in range(5):
        if lat_q[j] == 0:
            continue
        lat_sum += lat_q[j]
        a = a + 1
    for j in range(5):
        if lng_q[j] == 0:
            continue
        lng_sum += lng_q[j]
    lat_avg = lat_sum/a
    lng_avg = lng_sum/a

def pub_msg():
    msg =f"{{\"lat\": \"" + str(lat_avg) + "\",\"lng\": \"" + str(lng_avg) + "\"}"
    print(msg)
    r.publish(channel="1호차", message=msg)

def main():
    redis_connect()
    SER_connect()
    global i
    i = 0
    while True:
        get_lat_lng()
        get_avg(i)
        i = i + 1
        if i==5:
            i=0
        pub_msg()

if __name__ == "__main__":
    main()