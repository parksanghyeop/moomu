/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import logo from "../moomu_logo.jpg";
import "./MenuSidebar.css";

class MenuSidebar extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul className="menu bg-base-100 p-2 AppMenu">
          <li>
            <a className="AppMenu-link">노선 관리</a>
          </li>
          <li>
            <a className="AppMenu-link">공지사항</a>
          </li>
          <li>
            <a className="AppMenu-link">회원 조회</a>
          </li>
        </ul>
      </header>
    );
  }
}

export default MenuSidebar;
