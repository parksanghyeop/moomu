/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import "./RouteMap.css";
import { useEffect, useRef } from "react";

function RouteMap() {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(36.354683, 127.298177);
    const uonyeck = new naver.maps.LatLng(36.3537, 127.3415);
    const dajeonStation = new naver.maps.LatLng(36.3334, 127.436);
    const govBuilding = new naver.maps.LatLng(36.3494, 127.3848);
    const station01 = new naver.maps.LatLng(36.3484, 127.2982);
    const station02 = new naver.maps.LatLng(36.3457, 127.3017);
    const station03 = new naver.maps.LatLng(36.3417, 127.3055);
    const station04 = new naver.maps.LatLng(36.3538, 127.3416);
    const station05 = new naver.maps.LatLng(36.3741, 127.318);
    const station06 = new naver.maps.LatLng(36.3796, 127.318);
    const station07 = new naver.maps.LatLng(36.3841, 127.3203);
    const station08 = new naver.maps.LatLng(36.3917, 127.3151);
    const points = [
      [127.298177, 36.354683],
      [127.2982, 36.3485],
      [127.3017, 36.3457],
      [127.3055, 36.3417],
      [127.3416, 36.3538],
      [127.318, 36.3741],
      [127.318, 36.3796],
      [127.3203, 36.3841],
      [127.3151, 36.3917],
    ];
    let stations = [location, station01, station02, station03, station04, station05, station06, station07, station08];
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    console.log(location);
    console.log(stations);
    for (var loc in stations) {
      console.log(stations[loc]);
      new naver.maps.Marker({
        position: stations[loc],
        map,
      });
    }
    console.log(points[0].toString());
    const start = points[0].toString();
    const goal = points.slice(-1).toString();
    var temp = [];
    for (var i = 0; i < points.length; i++) {
      temp.push(points[i].toString());
    }
    const waypoints = temp.join("|");
    const direction15Url = `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=trafast`;
    console.log(direction15Url);
    naver.maps.Service.geocode(
      {
        query: "대전광역시 유성구 덕명동 146",
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }

        var result = response.v2, // 검색 결과의 컨테이너
          items = result.addresses; // 검색 결과의 배열
        console.log(result, items); //
        // do Something
      }
    );
    axios
      .get(direction15Url, {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "yxdllgza3i",
          "X-NCP-APIGW-API-KEY": "avFkOp6qAIH3quEtCysdzfCfqSWkeyhqgYl8x8t9",
          "x-requested-with": "http://192.168.0.13:3000",
        },
      })
      .then((response) => {
        console.log(response.data);
        let paths = response.data.route.trafast[0].path;
        let polylinePath = [];
        console.log(paths);
        paths.map((path) => {
          polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
        });
        new naver.maps.Polyline({
          path: polylinePath, //좌표배열
          strokeColor: "#FF0000", //선의 색 빨강
          strokeOpacity: 0.8, //선의 투명도
          strokeWeight: 6, //선의 두께
          map: map, //만들어 놓은 지도
        });
      });
    // new naver.maps.Marker({
    //   position: uonyeck,
    //   map,
    // });
  }, []);

  return (
    <div className="mapPage">
      <p className="bodyTitle "> 전체 노선 관리 </p>
      <div className="mapContainer">
        <ol className="steps steps-vertical">
          <li classname="step step-primary">
            <a>삼성화재 유성연수원</a>
          </li>
          <li classname="step step-primary">
            <a>한밭대 뚜레주르</a>
          </li>
          <li classname="step step-primary">
            <a>덕명중학교</a>
          </li>
          <li classname="step step-primary">
            <a>학하네거리</a>
          </li>
          <li classname="step step-primary">
            <a>유성온천역</a>
          </li>
          <li classname="step step-primary">
            <a>노은역</a>
          </li>
          <li classname="step step-primary">
            <a>열매마을 107동 맞은편</a>
          </li>
          <li classname="step step-primary">
            <a>지족역</a>
          </li>
          <li classname="step step-primary">
            <a>반석역</a>
          </li>
        </ol>
        <div ref={mapElement} className="naverMap" />
      </div>
    </div>
  );
}

export default RouteMap;
