import React, { useState } from "react";

const PageV1 = ({ currentPage, pageCount, ...props }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const pageNum = 5;

  const validateIndex = (index) => {
    // console.log("validateIndex : ", index, pageCount);
    let result = false;
    if (index >= 0 && index <= pageCount) {
      result = true;
    }
    if (index >= 0 && index - pageNum <= pageCount) {
      result = true;
    }
    return result;
  };

  const prevPage = () => {
    if (
      validateIndex(startIndex - pageNum) &&
      validateIndex(endIndex - pageNum)
    ) {
      setStartIndex(startIndex - pageNum);
      setEndIndex(endIndex - pageNum);
    }
  };

  const nextPage = () => {
    if (
      validateIndex(startIndex + pageNum) &&
      validateIndex(endIndex + pageNum)
    ) {
      setStartIndex(startIndex + pageNum);
      setEndIndex(endIndex + pageNum);
    }
  };

  var numbers = Array.from({ length: pageCount }, (v, k) => k + 1);
  // console.log("data pagination", numbers);
  return (
    <nav aria-label="Page navigation example">
      {
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={prevPage}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {numbers.slice(startIndex, endIndex).map((item) => (
            <li
              className={
                currentPage === item - 1 ? "page-item active" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => props.fncSearch(item - 1)}
              >
                {item}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={nextPage} aria-label="Next">
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      }
    </nav>
  );
};

export default PageV1;
