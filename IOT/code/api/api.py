import requests
from api.commuteOrLeave import CommuteOrLeave

url = "https://k7b202.p.ssafy.io/api/"


def get_station_list(bus_name: str, commute_or_leave: CommuteOrLeave):
    target_url = url + "shuttlebus/bus/name/" + bus_name
    params = {"commute_or_leave": commute_or_leave}
    response = requests.get(target_url, params=params)
    return response.json()


def send_station_alarm(
    station_id: int, station_name: str, commute_or_leave: CommuteOrLeave
):
    target_url = url + "shuttlebus/station/alarm"
    params = {
        "station_id": station_id,
        "station_name": station_name,
        "commute_or_leave": commute_or_leave,
    }
    response = requests.post(target_url, params=params)
    return int(response.text)


def set_bus_order(bus_name: str, commute_or_leave: CommuteOrLeave, order: int):
    target_url = url + "shuttlebus/bus/order/edit"
    params = {
        "bus_name": bus_name,
        "commute_or_leave": commute_or_leave,
        "order": order
    }
    response = requests.put(target_url, params=params)
    print(response)
