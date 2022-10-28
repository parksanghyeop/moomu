import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./DashBoard.css";

function DashBoard() {
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
          <tbody>
            {/* <!-- row 1 --> */}
            <tr>
              <td>
                <div className="items-center space-x-3">
                  <div className="font-bold routeTitle">1 호차</div>
                </div>
              </td>
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
            {/* <!-- row 2 --> */}
            <tr>
              <td>
                <div className="items-center space-x-3">
                  <div className="font-bold routeTitle">2 호차</div>
                </div>
              </td>
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
            {/* <!-- row 3 --> */}
            <tr>
              <td>
                <div className="items-center space-x-3">
                  <div className="font-bold routeTitle">3 호차</div>
                </div>
              </td>
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
            {/* <!-- row 4 --> */}
            <tr>
              <td>
                <div className="items-center space-x-3">
                  <div className="font-bold routeTitle">4 호차</div>
                </div>
              </td>
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
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn">노선 추가</button>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
