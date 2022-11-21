import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import Modal from "../componentes/modal";
import LoadingComponent from "../componentes/Loading";
import { setSelection } from "../reducers/selectionSlice";

function DashBoard() {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [isreloaded, setReloaded] = useState(true);
  const [routes, setRoutes] = useState({});
  const [newBusName, setnewBusName] = useState("Moomu");
  const [modalOpen, setModalOpen] = useState(false);
  const [changeName, setchangeName] = useState(false);
  const [busName, setBusName] = useState("Moomu");
  const [changeBusId, setChangeBusId] = useState(0);

  const region_id = useSelector((state) => state.token.decoded.region);
  const selection = useSelector((state) => state.selection.selection);
  // const region_id = 200;
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
    // console.log(config);
    const response = axios(config);
    // console.log(response);
    // console.log(routeId);
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
        order: "0",
      },
    };
    // console.log(config);
    const response = await axios(config);
    // console.log(response);
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
    // console.log(config);
    const response = await axios(config);
    // console.log(response);
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
      // console.log(res);
    });
  };
  const changeSelect = async function (e) {
    await dispatch(setSelection(e.target.value));
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

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="mt-4 p-4">
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
            // console.log(newBusId);
            // console.log(routes);
          }}
        >
          추가
        </button>
      </Modal>
      <div className="tablePage">
        <div className="content-box overflow-x-auto w-full custom-table-container">
          <div className="flex justify-start mb-4 mt-4">
            <button className="btn btn-sm btn-primary mr-4" onClick={() => openModal()}>
              노선 추가
            </button>
            <select className="select select-sm w-md max-w-xs" onChange={changeSelect}>
              {selectOptions.map((option) => (
                <option key={option.key} value={option.key} selected={selection === option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <table className="custom-table w-full">
            <tbody className="">
              {routes.map((route) => {
                return (
                  <tr className="cursor-pointer " key={route.id}>
                    <td className="w-full p-4 name hover:bg-base-200" onClick={() => changeRoute(route.id)}>
                      {route.name}
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-md changeIcon hover:bg-base-200"
                        onClick={async function () {
                          await setChangeBusId(route.id);
                          await setBusName(route.name);
                          setchangeName(true);
                        }}
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </td>
                    <td className="delete">
                      <button className="btn btn-ghost btn-md deleteIcon hover:bg-base-200" onClick={() => deleteRoute(route.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
