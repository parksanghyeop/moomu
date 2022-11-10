/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import "./RouteMap.css";
import Modal from "../componentes/modal";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadRoute, stationDown, staionUp, deleteStation, addStation, updateStation, updateRoute, reload } from "../reducers/stationSlice";
import { useParams, useNavigation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faSortUp, faCaretDown, faSortDown, faTrash } from "@fortawesome/free-solid-svg-icons";

function RouteMap() {
  const [routesDriving, setRoutesDriving] = useState({});
  const [routeEmpty, setRouteEmpty] = useState(false);
  const [modalHeader, setModalHeader] = useState("header");
  const [btnText, setbtnText] = useState("btn");
  const [btnDet, setbtnDet] = useState(true);
  const [delStation, setDelstation] = useState(null);
  const [newStation, setNewstation] = useState({});
  const [newStationName, setNewstationName] = useState("");
  const [arrived_time, setArrivedTime] = useState("08:30");
  const [map, setNaverMap] = useState({});
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const dataFetchedRef = useRef(false);
  const isLoaded = useSelector((state) => state.station.isLoaded);
  const stationInfos = useSelector((state) => state.station.stations);
  const busName = useSelector((state) => state.station.routeName);
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [targetMarker, setTarget] = useState(-1);
  const { naver } = window;

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };
  const isEmpty = function (val) {
    if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
      return true;
    } else {
      return false;
    }
  };
  const getStaticMap2Src = function (aUrl, imgId) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", aUrl, true);
    oReq.setRequestHeader("X-NCP-APIGW-API-KEY-ID", "yxdllgza3i");
    oReq.setRequestHeader("X-NCP-APIGW-API-KEY", "avFkOp6qAIH3quEtCysdzfCfqSWkeyhqgYl8x8t9");
    // use multiple setRequestHeader calls to set multiple values
    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        var u8 = new Uint8Array(arrayBuffer);
        var b64encoded = btoa(String.fromCharCode.apply(null, u8));
        var mimetype = "image/png"; // or whatever your image mime type is
        document.getElementById(imgId).src = "data:" + mimetype + ";base64," + b64encoded;
      }
    };
    oReq.send(null);
  };
  const staticMapUrl = function (coordinate, level) {
    return `/map-static/v2/raster?w=300&h=300&markers=type:d|size:mid|pos:${coordinate.x}%20${coordinate.y}&center=${coordinate.x},${coordinate.y}&level=${level}`;
  };

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
    dispatch(reload());
  });
  const navigate = useNavigate();
  const goList = function () {
    navigate("/main");
  };

  useEffect(() => {
    return () => dispatch(reload());
  }, [useNavigation]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    setRouteEmpty(isEmpty(stationInfos));
    console.log(params);
    console.log(routeEmpty);
    if (!isLoaded) {
      dispatch(loadRoute(params));
      console.log(stationInfos);
    }
  }, []);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (isLoaded) dataFetchedRef.current = true;
    // if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(36.354683, 127.298177);
    // 동적 지도 옵션
    const mapOptions = {
      center: location,
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const naverMap = new naver.maps.Map(mapElement.current, mapOptions);
    let points = [];
    let centerLat = 0;
    let centerLng = 0;
    let zoomLevel = 12;

    for (var loc in stationInfos) {
      const newMarker = new naver.maps.Marker({
        position: stationInfos[loc].stationLatLng,
        map: naverMap,
        title: stationInfos[loc].stationName,
        arrived_time: stationInfos[loc].arrived_time,
      });
      naver.maps.Event.addListener(newMarker, "click", markerClick(loc));
      let tmpMarkers = markers;
      tmpMarkers.push(newMarker);
      setMarkers(tmpMarkers);
      // console.log(markers, newMarker);
      points.push(convetLatLngCorr(stationInfos[loc].stationLatLng));
      if (loc == 0 || loc == stationInfos.length - 1) {
        centerLat += stationInfos[loc].stationLatLng._lat;
        centerLng += stationInfos[loc].stationLatLng._lng;
      }
    }
    centerLat /= 2;
    centerLng /= 2;
    const cneterLoc = new naver.maps.LatLng(centerLat, centerLng);

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
    const direction15Url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=trafast`;
    console.log(direction15Url);
    // naver.maps.Service.geocode(
    //   {
    //     query: "대전광역시 유성구 덕명동 146",
    //   },
    //   function (status, response) {
    //     if (status !== naver.maps.Service.Status.OK) {
    //       return alert("Something wrong!");
    //     }

    //     var result = response.v2, // 검색 결과의 컨테이너
    //       items = result.addresses; // 검색 결과의 배열
    //     // console.log(result, items); //
    //     // do Something
    //   }
    // );
    // let tmpURL = "navermap" + direction15Url;
    // console.log(tmpURL);

    // naverMap 길찾기 요청, 경로 그리기
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
          const distance = response.data.route.trafast[0].summary.distance;
          // if (distance >= 20000) zoomLevel -= 1;
          if (distance >= 30000) zoomLevel -= 1;
          if (distance >= 40000) zoomLevel -= 1;
          console.log(distance, zoomLevel);
          naverMap.updateBy(cneterLoc, zoomLevel);
          paths.map((path) => {
            polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
          });
          new naver.maps.Polyline({
            path: polylinePath, //좌표배열
            strokeColor: "#3182CE", //선의 색 파랑
            strokeOpacity: 0.8, //선의 투명도
            strokeWeight: 6, //선의 두께
            map: naverMap, //만들어 놓은 지도
          });
        });

    // 클릭 event listener
    naverMap.addListener("click", (e) => mapClick(e));
    setNaverMap(naverMap);
  }, [stationInfos]);
  const convetLatLngCorr = function (LatLng) {
    return LatLng.x.toString() + "," + LatLng.y.toString();
  };
  // "map click" 함수
  const mapClick = function (e) {
    console.log(e.coord, modalOpen);
    setModalHeader("정류장 추가");
    setbtnText("추가");
    openModal();
    const data = { lat: e.coord._lat, lng: e.coord._lng };
    setNewstation(data);
    // console.log(newStation, data);
    const cordUrl = staticMapUrl(e.coord, 14);
    getStaticMap2Src(cordUrl, "cordMapImgTag");
  };
  // "marker click" 함수
  const markerClick = function (i) {
    return function (e) {
      console.log(modalOpen2);
      setModalHeader("정류장 수정");
      setbtnText("수정");
      openModal2();
      console.log(e);
      const marker = markers[i];
      console.log(marker, marker.position);
      setNewstationName(marker.title);
      setArrivedTime(marker.arrived_time);
      setTarget(i);
      const cordUrl = staticMapUrl(marker.position, 14);
      getStaticMap2Src(cordUrl, "cordMapImgTag2");
    };
  };

  return (
    <div className="mapPage">
      <Modal open={modalOpen2} close={closeModal2} header={modalHeader}>
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        {/* {newCord} */}
        <label className="input-group input-group-lg justify-center	">
          <span className="">이름</span>
          <input type="text" placeholder="Type here" className="input input-bordered input-lg w-3/4 max-w-xs text-center" value={newStationName} onChange={(e) => setNewstationName(e.target.value)} />
        </label>
        <label className="input-group input-group-lg justify-center	">
          <span className="">도착 시간</span>
          <input type="text" placeholder="Type here" className="input input-bordered input-lg w-2/5 max-w-xs" value={arrived_time} onChange={(e) => setArrivedTime(e.target.value)} />
        </label>
        <img id="cordMapImgTag2" alt="" />
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            // TODO: update station
            let seq = targetMarker;
            var tmpMarkers = markers;
            var marker = tmpMarkers.splice(seq, 1);
            marker[0].title = newStationName;
            marker[0].arrived_time = arrived_time;
            tmpMarkers.splice(seq, 0, marker[0]);
            setMarkers(tmpMarkers);
            marker.target = seq;
            console.log(markers, marker);
            dispatch(updateStation(marker));
            closeModal2();
          }}
        >
          {btnText}
        </button>
      </Modal>
      <Modal open={modalOpen} close={closeModal} header={modalHeader}>
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        {/* {newCord} */}
        {btnDet && (
          <div>
            <label className="input-group input-group-lg justify-center	">
              <span className="">이름</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-lg w-3/4 max-w-xs text-center"
                value={newStationName}
                onChange={(e) => setNewstationName(e.target.value)}
              />
            </label>
            <label className="input-group input-group-lg justify-center	">
              <span className="">도착 시간</span>
              <input type="text" placeholder="Type here" className="input input-bordered input-lg w-2/5 max-w-xs" value={arrived_time} onChange={(e) => setArrivedTime(e.target.value)} />
            </label>
          </div>
        )}
        <img id="cordMapImgTag" alt="" />
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            if (btnDet) {
              // TODO: Add station
              let data = newStation;
              data.name = newStationName;
              data.arrived_time = arrived_time;
              const mapLoc = new naver.maps.LatLng(data.lat, data.lng);
              setNewstation(data);
              console.log(newStation);
              const newMarker = new naver.maps.Marker({
                position: mapLoc,
                map: map,
                title: newStationName,
                arrived_time: arrived_time,
              });
              setMarkers([...markers, newMarker]);
              console.log(markers);
              dispatch(addStation(newStation));
              closeModal();
            } else {
              // TODO: Delete station
              const tmpMarkers = markers[delStation];
              console.log(tmpMarkers);
              tmpMarkers.setMap(null);
              dispatch(deleteStation(delStation));
              setbtnDet(true);
              closeModal();
            }
          }}
        >
          {btnText}
        </button>
      </Modal>
      <p className="bodyTitle "> {busName} 노선 관리 </p>
      <div className="mapContainer">
        <div className="routeContainer">
          <ul className="steps steps-vertical">
            {stationInfos.map((station) => {
              return (
                <li className="step step-primary" key={station.id}>
                  <span className="stationName">{station.stationName}</span>
                  <div className="updownBtnFrame">
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      className="stationUpDown"
                      onClick={() => {
                        dispatch(staionUp(station.id));
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="stationUpDown"
                      onClick={() => {
                        dispatch(stationDown(station.id));
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="stationUpDown stationDelete"
                      onClick={() => {
                        const cordUrl = staticMapUrl(station.stationLatLng, 15);
                        getStaticMap2Src(cordUrl, "cordMapImgTag");
                        setModalHeader("정류장 삭제");
                        setbtnText("삭제");
                        setbtnDet(false);
                        setDelstation(station.id);
                        openModal();
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div ref={mapElement} className="naverMap" />
      </div>
      <button
        className="btn btn-primary saveBtn mt-3"
        onClick={async function () {
          await dispatch(updateRoute(params));
          goList();
        }}
      >
        변경 사항 저장
      </button>
    </div>
  );
}

export default RouteMap;
