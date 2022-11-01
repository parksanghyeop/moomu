import React, { useState } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/tokenSlice";
// import { tokenSelector } from "../reducers/tokenSlice";

function LogiInPage() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

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
    <div className="App">
      <div className="bodyFrame">
        <p className="bodyTitle "> LogIn </p>
        <div className="form-control logInCtrl">
          <label className="input-group input-group-lg">
            <span className="bodyLabel">ID</span>
            <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={ID} onChange={(e) => setID(e.target.value)} />
          </label>
          <label className="input-group input-group-lg">
            <span className="bodyLabel">PASSWORD</span>
            <input type={passwordType.type} placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={PW} onChange={(e) => setPW(e.target.value)} />
            <span className="pwShow input input-bordered input-lg" onClick={handlePasswordType}>
              {passwordType.visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </label>
          <button
            className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn"
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
              let url = "https://cors-anywhere.herokuapp.com/http://k7b202.p.ssafy.io:8000/users/login";
              // let url = "http://k7b202.p.ssafy.io:8000/users/login";

              // const options = {
              //   method: "POST",
              //   body: body,
              //   url: url,
              // };

              axios.post(url, body).then((res) => {
                dispatch(login(res.data));
                console.log(token);
                goToMain();
              });
            }}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogiInPage;
/* LogIn Page component */
