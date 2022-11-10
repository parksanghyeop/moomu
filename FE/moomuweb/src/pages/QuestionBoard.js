/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import Pagenation from "../componentes/pagination";
import LoadingComponent from "../componentes/Loading";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const [reload, setreload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [maxPage, setMaxPage] = useState(5);
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  // let getNoticeUrl = "https://k7b202.p.ssafy.io/api/notice?page=0&limit=10";

  useEffect(() => {
    getQuestions(currentPage - 1, pageLimit);
  }, [currentPage, reload]);

  const getQuestionUrl = function (page, limit) {
    return `https://k7b202.p.ssafy.io/api/faq/admin?page=${page}&limit=${limit}`;
  };

  const getQuestions = async (page, limit) => {
    var config = {
      method: "get",
      url: getQuestionUrl(page, limit),
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    const response = await axios(config);
    setQuestion(response.data.items);
    setMaxPage(response.data.total_pages);
    console.log(response);
    console.log(question);
    setLoading(false);
  };
  const navigate = useNavigate();
  const createQuestion = function () {
    navigate(`/faq/new`);
  };
  const questionDetail = function (noticeId) {
    navigate(`/faq/${noticeId}`);
  };
  const deleteQuestion = async function (questionId) {
    var config = {
      method: "delete",
      url: `https://k7b202.p.ssafy.io/api/faq/delete/${questionId}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    const response = await axios(config);
    setreload(!reload);
    console.log(response);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="tablePage">
      <p className="bodyTitle "> 문의사항 </p>
      <div className="overflow-x-auto w-full">
        <table className="custom-table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-primary font-bold table-title sticky top-0">
              {/* <th className=" ">공지</th> */}
              {/* <th className="w-36 ">노선 변경</th>
              <th className="w-36 ">노선 삭제</th> */}
            </tr>
          </thead>
          <tbody className="">
            {question.map((question) => {
              return (
                <tr key={question.id}>
                  <td className="font-bold routeTitle">
                    <a className="link link-hover link-primary" onClick={() => questionDetail(question.id)}>
                      {question.title}
                    </a>
                  </td>
                  {/* <td>
                    <button className="btn btn-ghost btn-lg changeIcon">
                      <FontAwesomeIcon icon={faRoute} onClick={() => answerNotice(notice.id)} />
                    </button>
                  </td>*/}
                  <td>
                    <button className="btn btn-ghost btn-lg deleteIcon">
                      <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteQuestion(question.id)} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className="flex mb-1">
        <Pagenation
          total={maxPage}
          limit={pageLimit}
          page={currentPage}
          setPage={(num) => {
            setCurrentPage(num);
            console.log(currentPage);
          }}
          classNames="justify-self-center	"
        />
      </footer>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
