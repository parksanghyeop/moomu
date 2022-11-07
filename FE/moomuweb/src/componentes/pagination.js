import React from "react";

export default function Pagination({ page, totalPosts, limit, setPage }) {
  const pageLimit = limit;
  let firstNum = page - (page % pageLimit) + 1;
  let lastNum = page - (page % pageLimit) + pageLimit;

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
          <button onClick={() => setPage(firstNum)} aria-current={page === firstNum ? "page" : null}>
            {firstNum}
          </button>
          {Array(pageLimit - 1)
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
                    classNames={"btn" + (page === firstNum + 1 + i ? "btn-active" : null)}
                  >
                    {firstNum + 1 + i}
                  </button>
                );
              } else if (i >= pageLimit - 2) {
                return (
                  <button border="true" key={i + 1} onClick={() => setPage(lastNum)} classNames={"btn" + (page === firstNum + 1 + i ? "btn-active" : null)}>
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
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
