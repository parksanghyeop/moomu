import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setDate] = useState("");

  const params = useParams();
  const rawToken = useSelector((state) => state.token.rawToken.access_token);

  const navigate = useNavigate();
  const goBack = function () {
    navigate("/notice");
  };

  const getNotice = async function (id) {
    var config = {
      method: "get",
      url: `https://k7b202.p.ssafy.io/api/notice/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    console.log(id);
    const response = await axios(config);
    setTitle(response.data.title);
    setContent(response.data.content);
    setDate(response.data.created_date);
    console.log(response);
    console.log(title);
  };
  useEffect(() => {
    getNotice(params.id);
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{content}</p>
          <button className="btn btn-primary" onClick={() => goBack()}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
