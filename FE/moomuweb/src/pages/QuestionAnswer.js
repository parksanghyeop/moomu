import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./Question.css";

export default function AnswerQuestion(props) {
  const [content, setContent] = useState("");
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  const navigate = useNavigate();

  const goList = function () {
    navigate("/faq");
  };

  const makeNotice = async function () {
    var config = {
      method: "post",
      url: `https://k7b202.p.ssafy.io/api/faq/answer`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
      data: {
        faq_id: props.id,
        content: content,
      },
    };
    const response = await axios(config);
    console.log(response);
    goList();
  };

  return (
    <div className="noticeForm bg-base-200 my-3">
      <div className="form-area">
        <form role="form">
          <br styles="clear:both" />
          <div className="form-group">
            <textarea
              className="form-control w-3/4 textarea textarea-primary my-5"
              type="textarea"
              id="subject"
              placeholder="Subject"
              maxLength="900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button type="button" id="submit" name="submit" className="btn btn-primary pull-right mx-5" onClick={() => makeNotice()}>
            답변 등록
          </button>
        </form>
      </div>
    </div>
  );
}
