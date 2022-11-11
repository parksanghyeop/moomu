import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./Notice.css";

export default function NewNotice() {
  const [title, setTitile] = useState("");
  const [content, setContent] = useState("");
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  const navigate = useNavigate();

  const goList = function () {
    navigate("/notice");
  };

  const makeNotice = async function () {
    var config = {
      method: "post",
      url: `https://k7b202.p.ssafy.io/api/notice`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
      data: {
        title: title,
        content: content,
      },
    };
    const response = await axios(config);
    console.log(response);
    goList();
  };

  return (
    <div className="noticeForm bg-base-200">
      <div className="form-area">
        <form role="form">
          <br styles="clear:both" />
          <div className="form-group">
            <input
              type="text"
              className="form-control input input-bordered input-primary w-full max-w-lg my-5"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control w-full textarea textarea-primary my-5"
              type="textarea"
              id="subject"
              placeholder="Subject"
              maxlength="900"
              rows="15"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button type="button" id="submit" name="submit" className="btn btn-primary pull-right mx-5" onClick={() => makeNotice()}>
            공지 등록
          </button>
          <button className="btn btn-primary" onClick={() => goList()}>
            목록
          </button>
        </form>
      </div>
    </div>
  );
}
