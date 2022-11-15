/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
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

  const main = useRef(null);
  const notice = useRef(null);
  const users = useRef(null);

  useEffect(() => {
    if (location.pathname === "/main") {
      main.current.classList.add("active");
      notice.current.classList.remove("active");
      users.current.classList.remove("active");
    } else if (location.pathname === "/notice") {
      main.current.classList.remove("active");
      notice.current.classList.add("active");
      users.current.classList.remove("active");
    } else if (location.pathname === "/users") {
      main.current.classList.remove("active");
      notice.current.classList.remove("active");
      users.current.classList.add("active");
    }
  }, [location]);

  return (
    <>
      {location.pathname != "/login" && location.pathname != "/contact" && (
        <header className="App-header">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              {/* <img src={logo} className="w-12" alt="logo" /> */}
              <a className="btn btn-ghost normal-case text-xl">MooMu</a>
            </div>
            <div className="flex-none">
              <div
                className="btn btn-primary btn-sm"
                onClick={() => {
                  logOut();
                }}
              >
                로그아웃
              </div>
            </div>
          </div>
          <ul className="menu menu-horizontal bg-base-100 rounded-box p-2">
            <li className="main">
              <Link className="AppMenu-link" ref={main} to="/main">
                노선 관리
              </Link>
            </li>
            <li className="notice">
              <Link className="AppMenu-link" ref={notice} to="/notice">
                공지사항
              </Link>
            </li>
            <li className="users">
              <Link className="AppMenu-link" ref={users} to="/users">
                회원 조회
              </Link>
            </li>
          </ul>
        </header>
      )}
    </>
  );
}
