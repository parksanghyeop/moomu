import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./DashBoard.css";
import Pagenation from "../componentes/pagination";

function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [notices, setNotices] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [maxPage, setMaxPage] = useState(5);
  const rawToken = useSelector((state) => state.token.rawToken.access_token);
  // let getNoticeUrl = "https://k7b202.p.ssafy.io/api/notice?page=0&limit=10";

  useEffect(() => {
    getNotices(currentPage - 1, pageLimit);
  }, [currentPage]);

  const getNoticeUrl = function (page, limit) {
    return `https://k7b202.p.ssafy.io/api/notice?page=${page}&limit=${limit}`;
  };

  const getNotices = async (page, limit) => {
    var config = {
      method: "get",
      url: getNoticeUrl(page, limit),
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${rawToken}`,
      },
    };
    const response = await axios(config);
    setNotices(response.data.items);
    setMaxPage(response.data.total_pages);
    console.log(response);
    console.log(notices);
    setLoading(false);
  };
  const navigate = useNavigate();
  let addRoute = function () {
    navigate("/map");
  };
  const createNotice = function () {
    navigate(`/notice/new`);
  };
  const noticeDetail = function (noticeId) {
    navigate(`/notice/${noticeId}`);
  };

  // const options = {
  //   method: "POST",
  //   body: body,
  //   url: url,
  // };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="tablePage">
      <p className="bodyTitle "> 공지사항 </p>
      <div className="overflow-x-auto w-full">
        <table className="custom-table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-primary font-bold table-title">
              <th className=" ">공지</th>
              {/* <th className="w-36 ">노선 변경</th>
              <th className="w-36 ">노선 삭제</th> */}
            </tr>
          </thead>
          <tbody className="">
            {notices.map((notice) => {
              return (
                <tr key={notice.id}>
                  <td className="font-bold routeTitle">
                    <a className="link link-hover link-primary" onClick={() => noticeDetail(notice.id)}>
                      {notice.title}
                    </a>
                  </td>
                  {/* <td>
                    <button className="btn btn-ghost btn-lg changeIcon">
                      <FontAwesomeIcon icon={faRoute} onClick={() => answerNotice(notice.id)} />
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-lg deleteIcon">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className="flex">
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
        <button
          className="btn btn-primary justify-self-end ml-16"
          onClick={() => {
            createNotice();
          }}
        >
          작성
        </button>
      </footer>
    </div>
  );
}

export default DashBoard;
/* LogIn Page component */
