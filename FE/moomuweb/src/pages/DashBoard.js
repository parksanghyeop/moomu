import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import Modal from "../componentes/modal";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [isreloaded, setReloaded] = useState(true);
  const [routes, setRoutes] = useState({});
  const [selection, setSelection] = useState("COMMUTE");
  const [newBusName, setnewBusName] = useState("Moomu");
  const [modalOpen, setModalOpen] = useState(false);

  const region_id = useSelector((state) => state.token.decoded.region);
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  // let url = `http://k7b202.p.ssafy.io:8000/shuttlebus/bus?region_id=${region_id}`;
  // let url = "https://k7b202.p.ssafy.io/api/shuttlebus/bus?region_id=200&commute_or_leave=COMMUTE";
  let url = `https://k7b202.p.ssafy.io/api/shuttlebus/bus?region_id=200&commute_or_leave=${selection}`;
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
        region_id: 200,
        name: newBusName,
        commute_or_leave: selection,
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
      console.log(res.data);
    });
  };
  const changeSelect = async function (e) {
    await setSelection(e.target.value);
  };
  const navigate = useNavigate();
  let addRoute = function () {
    navigate("/map");
  };
  const changeRoute = function (routeId) {
    navigate(`/map/${routeId}`);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  // const options = {
  //   method: "POST",
  //   body: body,
  //   url: url,
  // };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div>
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
        <div className="overflow-x-auto w-full">
          <table className="custom-table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-primary font-bold table-title">
                <th className="w-60 ">노선명</th>
                <th className="w-36 ">노선 변경</th>
                <th className="w-36 ">노선 삭제</th>
              </tr>
            </thead>
            <tbody className="">
              {routes.map((route) => {
                return (
                  <tr key={route.id}>
                    <td className="font-bold routeTitle">{route.name}</td>
                    <td>
                      <button className="btn btn-ghost btn-lg changeIcon">
                        <FontAwesomeIcon icon={faRoute} onClick={() => changeRoute(route.id)} />
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
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn" onClick={() => openModal()}>
          노선 추가
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
