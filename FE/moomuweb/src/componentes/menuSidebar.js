/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../reducers/tokenSlice";
// import { tokenSelector } from "../reducers/tokenSlice";

import logo from "../moomu_logo.jpg";
import "./MenuSidebar.css";

export default function MenuSidebar() {
  // const token = useSelector(tokenSelector());
  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = function () {
    sessionStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };
  const location = useLocation();

  console.log(location.pathname);

  return (
    <>
      {location.pathname != "/login" && (
        <header className="App-header">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              {/* <img src={logo} className="w-12" alt="logo" /> */}
              <a className="btn btn-ghost normal-case text-xl">MooMu</a>
            </div>
            <div className="flex-none">
              <div className="btn btn-primary btn-sm">로그아웃</div>
            </div>
          </div>
          <ul className="menu menu-horizontal bg-base-100 rounded-box p-2">
            <li className="">
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
              <Link className="AppMenu-link" to="/users">
                회원 조회
              </Link>
            </li>
          </ul>
        </header>
      )}
    </>
  );
}
