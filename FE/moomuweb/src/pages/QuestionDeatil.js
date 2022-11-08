import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NewQuestion from "./QuestionWriting";

import axios from "axios";

export default function NewPost() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState({});
  const [createdAt, setDate] = useState("");
  const [onOff, setOnOff] = useState(false);

  const params = useParams();
  const rawToken = useSelector((state) => state.token.rawToken.access_token);

  const navigate = useNavigate();
  const goBack = function () {
    navigate("/faq");
  };

  const getNotice = async function (id) {
    var config = {
      method: "get",
      url: `https://k7b202.p.ssafy.io/api/faq/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    console.log(id);
    const response = await axios(config);
    setTitle(response.data.faq.title);
    setContent(response.data.faq.content);
    setDate(response.data.faq.created_date);
    setAnswers(response.data.answer);
    console.log(response);
    console.log(title);
    setLoading(false);
  };
  useEffect(() => {
    getNotice(params.id);
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="">
          <h1 className="text-5xl font-bold mx-10">{title}</h1>
          <p className="py-6">{content}</p>
          {answers.map((answer) => {
            return (
              <div>
                <div className="divider w-8/9 my-3"></div>
                <p key={answer.id}>{answer.content}</p>
              </div>
            );
          })}
          <div className="divider w-8/9 mt-3"></div>
          {onOff && <NewQuestion id={params.id}></NewQuestion>}
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              setOnOff(!onOff);
            }}
          >
            {onOff ? "답변닫기" : "답변하기"}
          </button>
          <button className="btn btn-primary" onClick={() => goBack()}>
            목록
          </button>
        </div>
      </div>
    </div>
  );
}
