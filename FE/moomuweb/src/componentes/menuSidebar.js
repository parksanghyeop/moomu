/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/tokenSlice";
// import { tokenSelector } from "../reducers/tokenSlice";

import logo from "../moomu_logo.jpg";
import "./MenuSidebar.css";
import { useAxios } from "../context/CustomAxios";

export default function MenuSidebar() {
  // const token = useSelector(tokenSelector());
  const [regions, setRegions] = useState({});
  const token = useSelector((state) => state.token.isToken);
  const region = useSelector((state) => state.token.decoded.region);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customAxios = useAxios();
  const logOut = function () {
    dispatch(logout());
    navigate("/");
  };
  const response2State = (repd) => {
    let data = {};
    for (let ii = 0; ii < repd.length; ii++) {
      const element = repd[ii];
      data[element.id] = element.name;
    }
    return data;
  };
  useEffect(() => {
    const getRegions = async () => {
      const config = {
        method: "get",
        url: "https://k7b202.p.ssafy.io/api/regions?skip=0&limit=100",
      };
      const response = await customAxios(config);
      const stateData = response2State(response.data);
      setRegions(stateData);
      return stateData;
    };
    getRegions();
  }, []);

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
              {regions[region]} 캠퍼스/로그아웃
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
