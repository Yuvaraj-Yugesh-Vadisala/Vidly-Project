import React from "react";
import Heart from "./common/heart";
import "font-awesome/css/font-awesome.css";
import { Link } from "react-router-dom";

const MovieTable = (props) => {
  const { paginatedMovies, onLike, onDelete, onSort, sortColumn } = props; // Get sortColumn from props

  const renderSortIcon = (column) => {
    if (sortColumn.path === column) {
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-up"></i> // Ascending icon
      ) : (
        <i className="fa fa-sort-down"></i> // Descending icon
      );
    }
    return null; // No icon if it's not the current sort column
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
            Title {renderSortIcon("title")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("genre.name")}
          >
            Genre {renderSortIcon("genre.name")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("numberInStock")}
          >
            Stock {renderSortIcon("numberInStock")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("dailyRentalRate")}
          >
            Rate {renderSortIcon("dailyRentalRate")}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart onLiked={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
