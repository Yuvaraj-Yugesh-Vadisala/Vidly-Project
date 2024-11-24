import * as genresAPI from "./fakeGenreService";

const moviesKey = "movies";

// Default movies
const defaultMovies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  }
];

// Initialize movies in local storage if not present
function initializeMovies() {
  const storedMovies = localStorage.getItem(moviesKey);
  if (!storedMovies) {
    localStorage.setItem(moviesKey, JSON.stringify(defaultMovies));
  }
}

// Load movies from local storage
function loadMovies() {
  return JSON.parse(localStorage.getItem(moviesKey)) || [];
}

// Call to initialize movies
initializeMovies();

// Get movies from local storage
export function getMovies() {
  return loadMovies();
}

// Get a single movie by ID
export function getMovie(id) {
  return loadMovies().find(m => m._id === id);
}

// Save movie to local storage
export function saveMovie(movie) {
  const moviesInDb = loadMovies();
  let movieInDb = moviesInDb.find(m => m._id === movie._id) || {};

  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.getGenres().find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    moviesInDb.push(movieInDb);
  } else {
    const index = moviesInDb.indexOf(movieInDb);
    moviesInDb[index] = movieInDb;
  }

  localStorage.setItem(moviesKey, JSON.stringify(moviesInDb));
  return movieInDb;
}

// Delete movie from local storage
export function deleteMovie(id) {
  const moviesInDb = loadMovies();
  const movieInDb = moviesInDb.find(m => m._id === id);
  moviesInDb.splice(moviesInDb.indexOf(movieInDb), 1);
  localStorage.setItem(moviesKey, JSON.stringify(moviesInDb));
  return movieInDb;
}
