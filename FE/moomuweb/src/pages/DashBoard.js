import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import Modal from "../componentes/modal";
import LoadingComponent from "../componentes/Loading";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [isreloaded, setReloaded] = useState(true);
  const [routes, setRoutes] = useState({});
  const [selection, setSelection] = useState("COMMUTE");
  const [newBusName, setnewBusName] = useState("Moomu");
  const [modalOpen, setModalOpen] = useState(false);
  const [changeName, setchangeName] = useState(false);
  const [busName, setBusName] = useState("Moomu");
  const [changeBusId, setChangeBusId] = useState(0);

  // const region_id = useSelector((state) => state.token.decoded.region);
  const region_id = 200;
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  // let url = `http://k7b202.p.ssafy.io:8000/shuttlebus/bus?region_id=${region_id}`;
  // let url = "https://k7b202.p.ssafy.io/api/shuttlebus/bus?region_id=200&commute_or_leave=COMMUTE";
  let url = `https://k7b202.p.ssafy.io/api/shuttlebus/bus?region_id=${region_id}&commute_or_leave=${selection}`;
  // let url = `shuttlebus/bus?region_id=${region_id}`;

  const deleteRoute = function (routeId) {
    var config = {
      method: "delete",
      url: `http://k7b202.p.ssafy.io:8000/shuttlebus/bus/delete/${routeId}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    console.log(config);
    const response = axios(config);
    console.log(response);
    console.log(routeId);
    setReloaded(!isreloaded);
  };
  const newRoute = async function () {
    var config = {
      method: "post",
      url: "https://k7b202.p.ssafy.io/api/shuttlebus/bus/register",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
      data: {
        region_id: region_id,
        name: newBusName,
        commute_or_leave: selection,
      },
    };
    console.log(config);
    const response = await axios(config);
    console.log(response);
    await setReloaded(!isreloaded);
  };
  const sendBusName = async function () {
    var config = {
      method: "put",
      url: `https://k7b202.p.ssafy.io/api/shuttlebus/bus/edit/${changeBusId}?name=${busName}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    console.log(config);
    const response = await axios(config);
    console.log(response);
    await setReloaded(!isreloaded);
  };
  useEffect(() => {
    getRoutes();
  }, [selection, isreloaded]);

  const selectOptions = [
    { key: "COMMUTE", value: "승차 노선" },
    { key: "LEAVE", value: "하차 노선" },
  ];

  const getRoutes = () => {
    axios.get(url).then((res) => {
      setRoutes(res.data);
      setLoading(false);
      console.log(res);
    });
  };
  const changeSelect = async function (e) {
    await setSelection(e.target.value);
  };
  const navigate = useNavigate();
  const changeRoute = function (routeId) {
    navigate(`/map/${routeId}`);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModal2 = () => {
    setchangeName(false);
  };
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  // const options = {
  //   method: "POST",
  //   body: body,
  //   url: url,
  // };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <Modal open={changeName} close={closeModal2} header="노선 이름 변경">
        <label className="input-group input-group-lg">
          <span className="">이름</span>
          <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={busName} onChange={(e) => setBusName(e.target.value)} />
        </label>
        <footer>
          <button
            className="btn btn-primary mt-3 mx-3"
            onClick={async () => {
              await sendBusName();
              closeModal2();
              changeRoute(changeBusId);
            }}
          >
            노선 변경
          </button>
          <button
            className="btn btn-primary mt-3 mx-3"
            onClick={async () => {
              await sendBusName();
              closeModal2();
            }}
          >
            저장
          </button>
        </footer>
      </Modal>
      <Modal open={modalOpen} close={closeModal} header="신규 노선 추가">
        <label className="input-group input-group-lg">
          <span className="">이름</span>
          <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={newBusName} onChange={(e) => setnewBusName(e.target.value)} />
        </label>
        <button
          className="btn btn-primary mt-3"
          onClick={async () => {
            await newRoute();
            // changeRoute();
            // addRoute();
            closeModal();
            const newBusId = routes;
            console.log(newBusId);
            console.log(routes);
          }}
        >
          추가
        </button>
      </Modal>
      <div className="tablePage">
        <div className="flex justify-items-center items-center">
          <p className="bodyTitle "> 전체 노선 관리 </p>
          <select className="select select-primary select-bordered w-md max-w-xs" onChange={changeSelect}>
            {selectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto w-full custom-table-container">
          <table className="custom-table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-primary font-bold table-title sticky top-0 ">
                <th className="w-60 ">노선명</th>
                <th className="w-36 ">노선 변경</th>
                <th className="w-36 ">노선 삭제</th>
              </tr>
            </thead>
            <tbody className="">
              {routes.map((route) => {
                return (
                  <tr key={route.id}>
                    <td className="font-bold routeTitle link link-primary" onClick={() => changeRoute(route.id)}>
                      {route.name}
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-lg changeIcon">
                        <FontAwesomeIcon
                          icon={faRoute}
                          onClick={async function () {
                            await setChangeBusId(route.id);
                            await setBusName(route.name);
                            setchangeName(true);
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-lg deleteIcon">
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteRoute(route.id)} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg absolute bottom-0 mb-3" onClick={() => openModal()}>
          노선 추가
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
