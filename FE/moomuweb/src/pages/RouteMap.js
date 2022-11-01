/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import "./RouteMap.css";
import { useEffect, useRef, useState } from "react";

function RouteMap() {
  const [routeStations, setRouteStaions] = useState([]);
  const [routesDriving, setRoutesDriving] = useState({});
  let theRoutes = [];
  const dataId = useState(0);
  const mapElement = useRef(null);
  const dataFetchedRef = useRef(false);

  var isEmpty = function (val) {
    if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(36.354683, 127.298177);
    let points = [];
    // setRouteStaions([location]);
    console.log(routeStations);

    initStations(naver);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    console.log(routeStations, theRoutes);
    for (var loc in theRoutes) {
      console.log(theRoutes[loc].x, theRoutes[loc].y);
      new naver.maps.Marker({
        position: theRoutes[loc],
        map,
      });
      points.push(convetLatLngCorr(theRoutes[loc]));
    }
    console.log("////////////////////////////////");
    console.log(points);
    // console.log(points[0].toString());
    const start = points[0];
    const goal = points.slice(-1);
    var temp = [];
    for (var i = 1; i < points.length - 1; i++) {
      temp.push(points[i]);
    }
    const waypoints = temp.join("|");
    const direction15Url = `/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=trafast`;
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
    let tmpURL = "navermap" + direction15Url;
    console.log(tmpURL);
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
        setRoutesDriving(response.data.route.trafast[0].path);
        let polylinePath = [];
        console.log(paths, routesDriving);
        paths.map((path) => {
          polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
        });
        new naver.maps.Polyline({
          path: polylinePath, //좌표배열
          strokeColor: "#3182CE", //선의 색 빨강
          strokeOpacity: 0.8, //선의 투명도
          strokeWeight: 6, //선의 두께
          map: map, //만들어 놓은 지도
        });
      });
  }, []);
  const initStations = function (naver) {
    if (isEmpty(routeStations)) {
      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new naver.maps.LatLng(36.354683, 127.298177);
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
      let tmpStations = [location, station01, station02, station03, station04, station05, station06, station07, station08];
      for (var loc in tmpStations) {
        console.log(tmpStations[loc].x, tmpStations[loc].y);
        dataId.current += 1;
        const newItem = { stationLatLng: tmpStations[loc], staionName: "test", id: routeStations.length };
        setRouteStaions((routeStations) => [...routeStations, newItem]);
        console.log(routeStations, newItem);
      }
      theRoutes.push(...tmpStations);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(theRoutes);
      // await setRouteStaions(tmpStations);
    }
  };
  const convetLatLngCorr = function (LatLng) {
    return LatLng.x.toString() + "," + LatLng.y.toString();
  };

  return (
    <div className="mapPage">
      <p className="bodyTitle "> 전체 노선 관리 </p>
      <div className="mapContainer">
        <div className="routeContainer">
          <ul className="steps steps-vertical">
            <li className="step step-primary">삼성화재 유성연수원</li>
            <li className="step step-primary">한밭대 뚜레주르</li>
            <li className="step step-primary">덕명중학교</li>
            <li className="step step-primary">학하네거리</li>
            <li className="step step-primary">유성온천역</li>
            <li className="step step-primary">노은역</li>
            <li className="step step-primary">열매마을 107동 맞은편</li>
            <li className="step step-primary">지족역</li>
            <li className="step step-primary">반석역</li>
            <li className="step step-primary">반석역</li>
          </ul>
        </div>
        <div ref={mapElement} className="naverMap" />
      </div>
    </div>
  );
}

export default RouteMap;
