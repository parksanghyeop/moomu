import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import LoadingComponent from "../componentes/Loading";
import { logout } from "../reducers/tokenSlice";

function UserBoard() {
  const [isLoading, setLoading] = useState(true);
  const [users, setusers] = useState({});
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  let getuserUrl = "https://k7b202.p.ssafy.io/api/users/admin";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    var config = {
      method: "get",
      url: getuserUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    try {
      const response = await axios(config);
      setusers(response.data);
      console.log(response);
      console.log(users);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 451) {
        dispatch(logout());
      }
    }
    // const response = await axios(config);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="p-4 mt-4">
      <div className="tablePage content-box h-">
        {/* <p className="bodyTitle "> 사용자 </p> */}
        <div className="overflow-x-auto w-full mt-5">
          <table className="custom-table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-primary font-bold table-title sticky top-0">
                <th className="w-60 ">사용자</th>
                <th className="w-36 ">승차 정류장</th>
                <th className="w-36 ">하차 정류장</th>
              </tr>
            </thead>
            <tbody className="" style={{ overflowY: "scroll" }}>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="font-bold routeTitle">{user.nickname}</td>
                    <td className="text-center">
                      <button className="btn btn-ghost btn-lg changeIcon">
                        {/* <FontAwesomeIcon icon={faIdBadge} onClick={() => changeRoute(user.id)} /> */}
                        {user.start_station ? <p className="stationInfo truncate"> {user.start_station.name} </p> : <FontAwesomeIcon icon={faIdBadge} />}
                      </button>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-ghost btn-lg changeIcon">
                        {user.end_station ? <p className="stationInfo truncate "> {user.end_station.name} </p> : <FontAwesomeIcon icon={faIdBadge} />}
                        {/* <FontAwesomeIcon icon={faTrashCan} /> */}
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

export default UserBoard;
/* UserBoard page */
