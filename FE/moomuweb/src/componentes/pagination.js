import React from "react";

export default function Pagination({ page, total, limit, setPage }) {
  const pageLimit = limit;
  let firstNum = page - (page % pageLimit) + 1;
  let lastNum = page - (page % pageLimit) + pageLimit;
  let lastPage = page;
  if (total < lastNum) {
    lastPage = total - firstNum;
  } else {
    lastPage = lastNum - firstNum;
  }

  return (
    <div>
      <div>
        <div className="btn-group">
          <button
            className="btn"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            «
          </button>
          <button onClick={() => setPage(firstNum)} className={"btn " + (page === firstNum ? "btn-active" : "")}>
            {firstNum}
          </button>
          {Array(lastPage)
            .fill()
            .map((_, i) => {
              if (i <= pageLimit - 1) {
                return (
                  <button
                    border="true"
                    key={i + 1 + firstNum}
                    onClick={() => {
                      setPage(firstNum + 1 + i);
                    }}
                    className={"btn " + (page === firstNum + 1 + i ? "btn-active" : "")}
                  >
                    {firstNum + 1 + i}
                  </button>
                );
              } else if (i >= pageLimit - 2) {
                return (
                  <button border="true" key={i + 1} onClick={() => setPage(lastNum)} className={"btn" + (page === firstNum + 1 + i ? "btn-active" : null)}>
                    {lastNum}
                  </button>
                );
              }
            })}
          <button
            className="btn"
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === total}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
