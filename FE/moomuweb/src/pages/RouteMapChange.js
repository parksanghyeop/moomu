/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import "./RouteMap.css";
import Modal from "../componentes/modal";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import stationSlice, {
  loadRoute,
  stationDown,
  staionUp,
  deleteStation,
  addStation,
  updateStation,
  updateRoute,
  reload,
  setStation,
} from "../reducers/stationSlice";
import { useParams, useNavigation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faSortUp,
  faCaretDown,
  faSortDown,
  faTrash,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

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
  const polyInfos = useSelector((state) => state.station.poly);
  const busName = useSelector((state) => state.station.routeName);
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [targetMarker, setTarget] = useState(-1);
  const { naver } = window;

  const [stationList, setStationList] = useState([]);

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
    if (
      val === "" ||
      val === undefined ||
      val === null ||
      (val !== null && typeof val === "object" && !Object.keys(val).length)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const getStaticMap2Src = function (aUrl, imgId) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", aUrl, true);
    oReq.setRequestHeader(
      "X-NCP-APIGW-API-KEY-ID",
      process.env.REACT_APP_API_KEY_ID
    );
    oReq.setRequestHeader("X-NCP-APIGW-API-KEY", process.env.REACT_APP_API_KEY);
    // use multiple setRequestHeader calls to set multiple values
    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        var u8 = new Uint8Array(arrayBuffer);
        var b64encoded = btoa(String.fromCharCode.apply(null, u8));
        var mimetype = "image/png"; // or whatever your image mime type is
        document.getElementById(imgId).src =
          "data:" + mimetype + ";base64," + b64encoded;
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
    setStationList(stationInfos);
  }, [stationInfos]);

  useEffect(() => {
    return () => dispatch(reload());
  }, [useNavigation]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    setRouteEmpty(isEmpty(stationList));
    console.log(params);
    console.log(routeEmpty);
    if (!isLoaded) {
      dispatch(loadRoute(params));
      console.log(stationList);
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
    let centerLat = 0;
    let centerLng = 0;
    let zoomLevel = 12;

    for (var loc in stationList) {
      const newMarker = new naver.maps.Marker({
        position: stationList[loc].stationLatLng,
        map: naverMap,
        title: stationList[loc].stationName,
        arrived_time: stationList[loc].arrived_time,
      });
      naver.maps.Event.addListener(newMarker, "click", markerClick(loc));
      let tmpMarkers = markers;
      tmpMarkers.push(newMarker);
      setMarkers(tmpMarkers);
      // console.log(markers, newMarker);
      if (loc == 0 || loc == stationList.length - 1) {
        centerLat += stationList[loc].stationLatLng._lat;
        centerLng += stationList[loc].stationLatLng._lng;
      }
    }
    centerLat /= 2;
    centerLng /= 2;
    const cneterLoc = new naver.maps.LatLng(centerLat, centerLng);
    naverMap.updateBy(cneterLoc, zoomLevel);
    if (isEmpty(stationInfos)) naverMap.updateBy(location, zoomLevel);

    let polylinePath = [];
    for (let i = 0; i < polyInfos.length; i++) {
      polylinePath.push(
        new naver.maps.LatLng(polyInfos[i].latitude, polyInfos[i].longitude)
      );
    }
    new naver.maps.Polyline({
      path: polylinePath, //좌표배열
      strokeColor: "#3182CE", //선의 색 파랑
      strokeOpacity: 0.8, //선의 투명도
      strokeWeight: 6, //선의 두께
      map: naverMap, //만들어 놓은 지도
    });
    // 클릭 event listener
    naverMap.addListener("click", (e) => mapClick(e));
    setNaverMap(naverMap);
  }, [stationList]);
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

  // fake data generator
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    result = result.map((item, index) => {
      if (item.order === index) {
        return item;
      } else {
        return {
          ...item,
          order: index,
        };
      }
    });

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: grid,
    paddingBottom: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#63b3ed" : "white",
    color: isDragging ? "white" : "black",
    boxShadow:
      "0 1px .625rem 0 hsla(210, 7%, 22%, .06), 0 .125rem .25rem 0 hsla(210, 7%, 22%, .08)",
    border: "1px solid #e8ebed",
    borderRadius: "0.5rem",
    // height: "10vh",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const queryAttr = "data-rbd-drag-handle-draggable-id";

  const [placeholderProps, setPlaceholderProps] = useState({});

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({});
    setStationList(
      reorder(stationList, result.source.index, result.destination.index)
    );
    // dispatch(setStation);
  };

  const onDragUpdate = (update) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  return (
    <div className="mapPage mt-8">
      <Modal open={modalOpen2} close={closeModal2} header={modalHeader}>
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        {/* {newCord} */}
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
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-lg w-2/5 max-w-xs"
            value={arrived_time}
            onChange={(e) => setArrivedTime(e.target.value)}
          />
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
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-lg w-2/5 max-w-xs"
                value={arrived_time}
                onChange={(e) => setArrivedTime(e.target.value)}
              />
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
      {/* <p className="bodyTitle text-ellipsis overflow-hidden"> {busName} 노선 관리 </p> */}
      <div className="mapContainer">
        <div className="flex flex-col">
          <div className="routeContainer relative">
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <ul className="">
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {stationList.map((station, index) => {
                        return (
                          <Draggable
                            key={station.id}
                            draggableId={station.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef} // 드래그가 시작되면 이 DOM에 ref가 달린다.
                                {...provided.draggableProps} // 드래그 핸들러를 달기 위한 props
                                {...provided.dragHandleProps} // 드래그 핸들러를 달기 위한 props
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <li key={station.id}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div className="flex item-center">
                                      <span className="mr-4">
                                        {parseInt(station.id) + 1}
                                      </span>
                                      <span
                                        className="stationName"
                                        style={{
                                          fontSize: "16px",
                                          textAlign: "left",
                                          wordBreak: "keep-all",
                                        }}
                                      >
                                        {station.stationName}
                                      </span>
                                    </div>
                                    <div className="updownBtnFrame">
                                      <i
                                        className="fa-regular fa-close text-sm"
                                        onClick={() => {
                                          const cordUrl = staticMapUrl(
                                            station.stationLatLng,
                                            15
                                          );
                                          getStaticMap2Src(
                                            cordUrl,
                                            "cordMapImgTag"
                                          );
                                          setModalHeader("정류장 삭제");
                                          setbtnText("삭제");
                                          setbtnDet(false);
                                          setDelstation(station.id);
                                          openModal();
                                        }}
                                      />
                                    </div>
                                  </div>
                                </li>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                      {/* <CustomPlaceholder snapshot={snapshot} /> */}
                      {/* <div
                        style={{
                          position: "absolute",
                          top: placeholderProps.clientY,
                          left: placeholderProps.clientX,
                          height: placeholderProps.clientHeight,
                          background: "#e0e0e0",
                          width: placeholderProps.clientWidth,
                        }}
                      ></div> */}
                    </div>
                  )}
                </Droppable>
              </ul>
            </DragDropContext>
          </div>
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-outline btn-sm mt-3 mr-2"
          >
            <i className="fa-solid fa-plus"></i>&nbsp; 새 정류장 추가
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">새 정류장 추가</h3>
              <p className="py-4">
                지도에서 추가할 정류장의 위치를 클릭해주세요.
              </p>
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn btn-primary">
                  확인
                </label>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm mt-2 mr-2"
            onClick={async function () {
              await dispatch(setStation(stationList));
              await dispatch(updateRoute(params));
              // goList();
            }}
          >
            <i className="fa-solid fa-floppy-disk"></i>&nbsp; 변경 사항 저장
          </button>
        </div>
        <div ref={mapElement} className="naverMap content-box" />
      </div>
    </div>
  );
}

export default RouteMap;
