import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import "font-awesome/css/font-awesome.css";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox"; // Importing the SearchBox component

export class Movie extends Component {
  state = {
    genres: [], // Array to hold the list of genres
    movies: [], // Array to hold the list of movies
    currentPage: 1, // Current page for pagination
    sortColumn: { path: "title", order: "asc" }, // Sorting state
    pageSize: 4, // Number of items per page
    searchQuery: "", // Query for searching movies
    selectedGenre: null, // Currently selected genre
  };

  // In a real-world application, we would fetch genres from a backend
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; // Adding an "All Genres" option
    this.setState({ movies: getMovies(), genres });
  }

  deleteHandle = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); // Filtering out the deleted movie
    deleteMovie(movie._id);
    this.setState({ movies });
  };

  likeHandle = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked; // Toggling the liked state
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); // Updating the current page
  };

  handleGenreSelect = (geners) => {
    console.log(geners);
    this.setState({ selectedGenre: geners, currentPage: 1, searchQuery: "" }); // Reset search query on genre change
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 }); // Updating search query
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc"; // Toggling sort order
    } else {
      sortColumn.path = path; // Updating sort path
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
    console.log(path);
  };

  render() {
    // If there are no movies, display a message
    if (this.state.movies.length === 0)
      return (
        <p>
          There are no movies in the DataBase{" "}
          <Link
            to="/movies/new"
            className="btn btn-primary m-2"
            style={{ marginBottom: 20 }}
          >
            Add a Movie
          </Link>
        </p>
      );

    // Filter the movies based on the selected genre and search query
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    // Further filter by search query
    const searched = filtered.filter((m) =>
      m.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    // Sort the filtered movies array based on the sortColumn's path and order
    const sorted = _.orderBy(
      searched,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    // Paginate the sorted movies
    const paginatedMovies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="row">
        <div className="col-lg-3 col-7">
          <ListGroup
            selectedGenreItem={this.state.selectedGenre}
            items={this.state.genres}
            onItemSelected={this.handleGenreSelect} // Handling genre selection
          />
        </div>
        <div className="col-lg col-12 m-3">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {searched.length} movies in the database</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />{" "}
          {/* Search Box */}
          <MovieTable
            sortColumn={this.state.sortColumn}
            paginatedMovies={paginatedMovies}
            onLike={this.likeHandle}
            onDelete={this.deleteHandle}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={searched.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
