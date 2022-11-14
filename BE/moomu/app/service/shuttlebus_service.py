from haversine import haversine
from app.db.schemas.station import Station
from app.core.config import settings
import redis
import sys
import json
import requests


r = redis.Redis(host="k7b202.p.ssafy.io", port=6379, db=0)
headers = {
    "X-NCP-APIGW-API-KEY-ID": settings.CLINET_ID,
    "X-NCP-APIGW-API-KEY": settings.CLIENT_SECRET,
}


def bus_near_station(bus_name: str, station_list: list[Station]):
    s = r.pubsub()
    s.subscribe(bus_name)
    while True:
        res = s.get_message(timeout=1)
        if res is None:
            return ()
        elif res["data"] != 1:
            break
    if res["data"] is None:
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
        post_bus = real_distance(dict["lat"], dict["lng"], post.lat, post.lng)
        post_cur = real_distance(cur.lat, cur.lng, post.lat, post.lng)
        if post_bus > post_cur:
            return (pre.id, cur.id)
        else:
            return (cur.id, post.id)


def real_distance(lat_s: str, lng_s: str, lat_e: str, lng_e: str):
    params = {
        "start": lng_s + "," + lat_s,
        "goal": lng_e + "," + lat_e,
    }
    response = requests.get(settings.URL, headers=headers, params=params)
    json_obj = response.json()
    return int(json_obj["route"]["traoptimal"][0]["summary"]["distance"])


def get_poly_line_list(station_list: list[Station]):
    start = str(station_list[0].lng) + "," + str(station_list[0].lat)
    end = (
        str(station_list[len(station_list) - 1].lng)
        + ","
        + str(station_list[len(station_list) - 1].lat)
    )
    waypoint = ""
    print(start)
    print(end)
    print(waypoint)
    for i in range(1, len(station_list) - 1):
        pos_station = station_list[i]
        waypoint = waypoint + str(pos_station.lng) + "," + str(pos_station.lat)
        if i is not len(station_list) - 2:
            waypoint = waypoint + "|"
    params = {"start": start, "goal": end, "waypoints": waypoint}
    response = requests.get(settings.URL, headers=headers, params=params)
    json_obj = response.json()
    return json_obj["route"]["traoptimal"][0]["path"]
