import React from "react";

import "./Table.css";

class RouteTable extends React.Component {
  render() {
    return (
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>노선명</th>
            <th>노선 변경</th>
            <th>노선 삭제</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    );
  }
}

export default RouteTable;
