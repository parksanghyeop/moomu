import React, { useState } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MenuSidebar from "../componentes/menuSidebar";

function LogiInPage() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div className="App">
      <MenuSidebar />
      <div className="bodyFrame">
        <p className="bodyTitle "> LogIn </p>
        <div className="form-control logInCtrl">
          <label className="input-group input-group-lg">
            <span className="bodyLabel">ID</span>
            <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={ID} onChange={(e) => setID(e.target.value)} />
          </label>
          <label className="input-group input-group-lg">
            <span className="bodyLabel">PASSWORD</span>
            <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" value={PW} onChange={(e) => setPW(e.target.value)} />
          </label>
          <button
            className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg logInBtn"
            onClick={() => {
              let body = {
                body: [
                  {
                    username: ID,
                    password: PW,
                  },
                ],
                username: ID,
                password: PW,
              };
              let url = "https://cors-anywhere.herokuapp.com/http://k7b202.p.ssafy.io:8000/users/login";
              // setID("");
              // setPW("");
              // console.log(typeof body);
              const options = {
                method: "POST",
                body: body,
                url: url,
              };
              console.log(options);
              axios.post(url, body).then((res) => {
                console.log(res);
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
