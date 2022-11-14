from app.db.schemas.station import Station
from app.core.config import settings
import requests


headers = {
    "X-NCP-APIGW-API-KEY-ID": settings.CLINET_ID,
    "X-NCP-APIGW-API-KEY": settings.CLIENT_SECRET,
}


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
