import React, { useState, useEffect } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/Auth";
import { login, logout } from "../reducers/tokenSlice";
import logo from "../assets/moomu_logo.jpg";

function LogiInPage() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const { setUser } = useAuth();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const userRole = useSelector((state) => state.token.decoded.role);

  useEffect(() => {
    if (userRole) {
      dispatch(logout());
    }
  }, []);

  //password type 변경용 state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  //password type 변경하는 함수
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div className="loginContainer">
      <div className="bodyTitle">
        <img className="logo" src={logo} width="180" />
      </div>
      <div className="formContainer">
        <label className="label">
          <span className="label-text">아이디</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-md w-full max-w-xs"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <label className="label">
          <span className="label-text">비밀번호</span>
        </label>
        <input
          type={passwordType.type}
          placeholder="Type here"
          className="input input-bordered input-md w-full max-w-xs"
          value={PW}
          onChange={(e) => setPW(e.target.value)}
        />
        <button
          className="btn btn-primary btn-block mt-4"
          onClick={() => {
            let body = {
              body: [
                {
                  // username: ID,
                  // password: PW,
                },
              ],
              username: ID,
              password: PW,
            };
            // let url = "https://cors-anywhere.herokuapp.com/http://k7b202.p.ssafy.io:8000/users/login";
            let url = "https://k7b202.p.ssafy.io/api/users/login";

            // const options = {
            //   method: "POST",
            //   body: body,
            //   url: url,
            // };
            let config = {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": "true",
                "X-Requested-With": "XMLHttpRequest",
              },
            };
            axios.post(url, body, config).then((res) => {
              dispatch(login(res.data));
              setUser({ userRole });

              console.log(token);
              goToMain();
            });
          }}
        >
          관리자 로그인
        </button>
      </div>
    </div>
  );
}

export default LogiInPage;
/* LogIn Page component */
