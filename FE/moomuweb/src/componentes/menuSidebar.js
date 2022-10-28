/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/tokenSlice";
// import { tokenSelector } from "../reducers/tokenSlice";

import logo from "../moomu_logo.jpg";
import "./MenuSidebar.css";

export default function MenuSidebar() {
  // const token = useSelector(tokenSelector());
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {token && (
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
          <li>{/* <a onClick={dispatch(logout())}>대전캠퍼스/로그아웃</a> */}</li>
        </ul>
      )}
    </header>
  );
}
