// src/components/addMovie.jsx

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { useNavigate } from "react-router-dom";

class AddMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  Schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
  }

  doSubmit = () => {
    // Save new movie
    saveMovie(this.state.data);
    // Optionally reset the form after saving
    this.setState({
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
    });
    // Redirect after saving (optional)
  };

  render() {
    return (
      <div>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

// Higher-order component to pass navigate
const MovieFormWrapper = (props) => {
  const navigate = useNavigate();
  return <AddMovie {...props} navigate={navigate} />;
};

export default MovieFormWrapper;
