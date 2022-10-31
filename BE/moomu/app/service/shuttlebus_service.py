from haversine import haversine
from app.db.schemas.station import Station
import redis
import sys
import json


r = redis.Redis(host="k7b202.p.ssafy.io", port=6379, db=0)


def bus_near_station(bus_name: str, station_list: list[Station]):
    s = r.pubsub()
    s.subscribe(bus_name)
    while True:
        res = s.get_message(timeout=1)
        if res["data"] == 1:
            break
    if res is None:
        return ()
    dict = json.loads(str(res["data"], "utf-8"))
    bus_pos = (float(dict["lat"]), float(dict["lng"]))
    min = sys.maxsize
    num = 0
    for i in station_list:
        station_pos = (float(i.lat), float(i.lng))
        km = haversine(bus_pos, station_pos)
        if min > km:
            min = km
            if num == 0:
                cur = station_list[num]
                pre = None
                post = station_list[num + 1]
            elif num == (len(station_list) - 1):
                cur = station_list[num]
                pre = station_list[num - 1]
                post = None
            else:
                cur = station_list[num]
                pre = station_list[num - 1]
                post = station_list[num + 1]
        num = num + 1
    if pre is None:
        return (cur.id, post.id)
    elif post is None:
        return (pre.id, cur.id)
    else:
        pre_pos = (float(pre.lat), float(pre.lng))
        post_pos = (float(post.lat), float(post.lng))
        if haversine(bus_pos, pre_pos) < haversine(bus_pos, post_pos):
            return (pre.id, cur.id)
        else:
            return (cur.id, post.id)
