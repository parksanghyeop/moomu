import serial
import redis
import time
import traceback
import pygame
import asyncio
import urllib.request
from api.commuteOrLeave import CommuteOrLeave
from haversine import haversine
from api.api import get_station_list, send_station_alarm, set_bus_order


global lat_q, lng_q
lat_q = [0] * 5
lng_q = [0] * 5
k = 0
i = 0
bus_name = "1호차"


async def redis_connect():
    try:
        global r
        r = redis.Redis(host="k7b202.p.ssafy.io", port=6379, db=0)
    except Exception:
        print(traceback.format_exc())


async def SER_connect():
    while True:
        try:
            global SER
            SER = serial.Serial("/dev/ttyUSB0", 9600)
            time.sleep(3)
            print("connect Success")
            break
        except:
            continue


async def get_lat_lng():
    global gpiostr, lat_decode, lng_decode
    gpiostr = ""
    while True:
        try:
            bytes = SER.read()
        except:
            continue
        decode_bytes = str(bytes, "utf-8")
        if decode_bytes == "$":
            gpiostr = ""
        gpiostr = gpiostr + decode_bytes
        if decode_bytes == "\r":
            gpiostr = "$GPGGA,083409.000,3621.2809,N,12717.8905"
            if gpiostr.startswith("$GPGGA"):
                gpiostr_string = gpiostr.split(",")
                lat = gpiostr_string[2]
                lng = gpiostr_string[4]
                if lat == "" or lng == "":
                    continue
                lat_decode = (
                    int(lat[0:2]) + int(lat[2:4]) / 60 + (int(lat[5:]) / 10000) / 60
                )
                lng_decode = (
                    int(lng[0:3]) + int(lng[3:5]) / 60 + (int(lng[6:]) / 10000) / 60
                )
                print("==========lat,lng_decode===========")
                print((lat_decode, lng_decode))
                break


async def get_avg():
    global lat_avg, lng_avg, i
    if lat_decode is None or lng_decode is None:
        return
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
    lat_avg = lat_sum / a
    lng_avg = lng_sum / a
    print("==========lat,lng_avg===========")
    print((lat_avg, lng_avg))


async def pub_msg():
    if lat_avg is None or lng_avg is None:
        return
    msg = f'{{"lat": "' + str(lat_avg) + '","lng": "' + str(lng_avg) + '"}'
    print(msg)
    r.publish(channel=bus_name, message=msg)


async def send_msg():
    global i
    while True:
        await get_lat_lng()
        await get_avg()
        await pub_msg()
        await asyncio.sleep(0.5)
        i = i + 1
        if i == 5:
            i = 0


async def get_station():
    global bus_name, station_list, commute_or_leave
    now = time.localtime().tm_hour
    if now >= 12 and now <= 24:
        commute_or_leave = CommuteOrLeave.LEAVE
    else:
        commute_or_leave = CommuteOrLeave.COMMUTE
    station_list = get_station_list(bus_name, commute_or_leave)
    print(station_list)


async def check_station_dist():
    global k, file_name
    station = station_list[k]
    station_pos = (float(station["lat"]), float(station["lng"]))
    station_next_pos = None
    if k <= len(station_list) - 2:
        station_next = station_list[k + 1]
        station_next_pos = (float(station_next["lat"]), float(station_next["lng"]))
    if (
        station_next_pos is not None
        and haversine(station_pos, station_next_pos, "m") < 1000
    ):
        sense_dist = 300
    else:
        sense_dist = 500
    print(station_pos)
    station_id = int(station["id"])
    station_name = station["name"]
    if lat_avg is None or lng_avg is None:
        return
    bus_pos = (lat_avg, lng_avg)
    print(haversine(station_pos, bus_pos, "m"))
    if haversine(station_pos, bus_pos, "m") < sense_dist:
        set_bus_order(bus_name, commute_or_leave, order=k)
        k = k + 1
        if send_station_alarm(station_id, station_name, commute_or_leave) > 0:
            exist = "T"
        else:
            exist = "F"
        file_name = "/home/pi/Desktop/Moomu/IOT/code/mp3/" + commute_or_leave + "_" + exist + ".wav"
        music(file_name)


async def repeat():
    while True:
        await check_station_dist()
        await asyncio.sleep(0.5)
        if k == len(station_list):
            set_bus_order(bus_name, commute_or_leave, order=-1)
            break


def music(file_name: str):
    pygame.mixer.init()
    pygame.mixer.music.set_volume(1.0)
    pygame.mixer.music.load(file_name)
    pygame.mixer.music.play()


def connect(host="http://google.com"):
    try:
        urllib.request.urlopen(host)
        return True
    except:
        return False


async def main():
    f = open("/home/pi/Desktop/Moomu/IOT/code/logs/log.txt", "a")
    now = time.strftime("%Y-%m-%d %H:%M:%S")
    f.write(now + " : " + "run\n")
    f.close()
    while True:
        connected = connect()
        time.sleep(1)
        if connected is True:
            print("internet connect!!")
            break
    await asyncio.gather(redis_connect(), SER_connect(), get_station())
    await asyncio.gather(send_msg(), repeat())


if __name__ == "__main__":
    asyncio.run(main())
