/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import "./RouteMap.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initRoute, reload } from "../reducers/stationSlice";

function RouteMap() {
  const [routesDriving, setRoutesDriving] = useState({});
  const [routeEmpty, setRouteEmpty] = useState(false);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const dataFetchedRef = useRef(false);
  const isLoaded = useSelector((state) => state.station.isLoaded);
  const stationInfos = useSelector((state) => state.station.stations);

  var isEmpty = function (val) {
    if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    setRouteEmpty(isEmpty(stationInfos));
    console.log(routeEmpty);
    if (!isLoaded) {
      dispatch(initRoute());
      console.log(stationInfos);
    }
    if (routeEmpty) {
      dispatch(initRoute());
      setRouteEmpty(isEmpty(stationInfos));
      console.log(routeEmpty);
      console.log(stationInfos);
    }
    dataFetchedRef.current = false;
  }, [stationInfos, routeEmpty, isLoaded, dispatch]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(36.354683, 127.298177);
    let points = [];
    // setRouteStaions([location]);

    // initStations(naver);

    const mapOptions = {
      center: location,
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    for (var loc in stationInfos) {
      // console.log(stationInfos, loc);
      new naver.maps.Marker({
        position: stationInfos[loc].stationLatLng,
        map,
      });
      points.push(convetLatLngCorr(stationInfos[loc].stationLatLng));
    }
    // console.log("////////////////////////////////");
    // console.log(points);
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
    if (isLoaded)
      axios
        .get(direction15Url, {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": "yxdllgza3i",
            "X-NCP-APIGW-API-KEY": "avFkOp6qAIH3quEtCysdzfCfqSWkeyhqgYl8x8t9",
            // "x-requested-with": "http://192.168.0.13:3000",
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
            strokeColor: "#3182CE", //선의 색 파랑
            strokeOpacity: 0.8, //선의 투명도
            strokeWeight: 6, //선의 두께
            map: map, //만들어 놓은 지도
          });
        });

    map.addListener("click", function (e) {
      console.log(e.coord);
    });
  }, [stationInfos, routeEmpty, isLoaded, dispatch]);
  const convetLatLngCorr = function (LatLng) {
    return LatLng.x.toString() + "," + LatLng.y.toString();
  };

  return (
    <div className="mapPage">
      <p className="bodyTitle "> 전체 노선 관리 </p>
      <div className="mapContainer">
        <div className="routeContainer">
          <ul className="steps steps-vertical">
            {stationInfos.map((route) => {
              return (
                <li className="step step-primary" key={route.id}>
                  {route.staionName}
                  <div className="updownBtnFrame">
                    <button className="btn btn-xs btn-primary" onClick={() => {}}>
                      up
                    </button>
                    <button className="btn btn-xs btn-primary" onClick={() => {}}>
                      down
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div ref={mapElement} className="naverMap" />
      </div>
    </div>
  );
}

export default RouteMap;
