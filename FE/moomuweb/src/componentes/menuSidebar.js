/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/tokenSlice";
// import { tokenSelector } from "../reducers/tokenSlice";

import logo from "../moomu_logo.jpg";
import "./MenuSidebar.css";

export default function MenuSidebar() {
  // const token = useSelector(tokenSelector());
  const token = useSelector((state) => state.token.isToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let logOut = function () {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {token && (
        <ul className="menu bg-base-100 p-2 AppMenu">
          <li>
            <Link className="AppMenu-link" to="/main">
              노선 관리
            </Link>
          </li>
          <li>
            <Link className="AppMenu-link" to="/notice">
              공지사항
            </Link>
          </li>
          <li>
            <Link className="AppMenu-link" to="/faq">
              문의사항
            </Link>
          </li>
          <li>
            <Link className="AppMenu-link" to="/users">
              회원 조회
            </Link>
          </li>
          <li>
            <a onClick={() => logOut()} className="logOut-link">
              대전캠퍼스/로그아웃
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
