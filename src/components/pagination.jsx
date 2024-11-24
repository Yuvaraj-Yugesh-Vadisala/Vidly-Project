import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props; // Calculate the total number of pages needed based on itemsCount and pageSize
  const pageCount = Math.ceil(itemsCount / pageSize); // If there is only one page, do not render pagination
  if (pageCount === 1) return null; // Create an array of page numbers from 1 to pageCount
  const pages = _.range(1, pageCount + 1); //so loadash is used to genarater array from given two indexs
  return (
    <div>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => props.onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
// Define PropTypes for the props received from other component a->b specif proptype in b not a beacuse b is reciving not a
Pagination.propTypes = {
  // Corrected from Pagination.prototype
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
