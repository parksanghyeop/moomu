import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [users, setusers] = useState({});
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  let getuserUrl = "https://k7b202.p.ssafy.io/api/users/admin";

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
    const response = await axios(config);
    setusers(response.data);
    console.log(response);
    console.log(users);
    setLoading(false);
  };
  const navigate = useNavigate();
  let addRoute = function () {
    navigate("/map");
  };
  const changeRoute = function (userId) {
    navigate(`/user/${userId}`);
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
    <div className="tablePage" style={{ width: "100%" }}>
      {/* <p className="bodyTitle "> 사용자 </p> */}
      <div className="overflow-x-auto w-full mt-5">
        <table className="custom-table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-primary font-bold table-title">
              <th className="w-60 ">노선명</th>
              <th className="w-36 ">노선 변경</th>
              <th className="w-36 ">노선 삭제</th>
            </tr>
          </thead>
          <tbody className="" style={{ overflowY: "scroll" }}>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="font-bold routeTitle">{user.nickname}</td>
                  <td>
                    <button className="btn btn-ghost btn-lg changeIcon">
                      <FontAwesomeIcon icon={faRoute} onClick={() => changeRoute(user.id)} />
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
      {/* <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn" onClick={() => addRoute()}>
        노선 추가
      </button> */}
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
