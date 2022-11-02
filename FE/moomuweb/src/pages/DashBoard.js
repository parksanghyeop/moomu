import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [routes, setRoutes] = useState({});
  const region_id = useSelector((state) => state.token.decoded.region);
  // let url = `http://k7b202.p.ssafy.io:8000/shuttlebus/bus?region_id=${region_id}`;
  let url = "https://k7b202.p.ssafy.io/api/shuttlebus/bus?region_id=200&commute_or_leave=COMMUTE";
  // let url = `shuttlebus/bus?region_id=${region_id}`;

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = () => {
    axios.get(url).then((res) => {
      setRoutes(res.data);
      setLoading(false);
    });
  };
  const navigate = useNavigate();
  let addRoute = function () {
    navigate("/map");
  };

  // const options = {
  //   method: "POST",
  //   body: body,
  //   url: url,
  // };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="tablePage">
      <p className="bodyTitle "> 전체 노선 관리 </p>
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
                      <FontAwesomeIcon icon={faRoute} />
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-lg deleteIcon">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn" onClick={() => addRoute()}>
        노선 추가
      </button>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
