// fakeGenreService.js

const genresKey = "genres";

// Default genres
export const genres = [ // Change here
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

// Initialize genres in local storage if not present
function initializeGenres() {
  const storedGenres = localStorage.getItem(genresKey);
  if (!storedGenres) {
    localStorage.setItem(genresKey, JSON.stringify(genres));
  }
}

// Load genres from local storage
function loadGenres() {
  return JSON.parse(localStorage.getItem(genresKey)) || [];
}

// Call to initialize genres
initializeGenres();

// Get genres from local storage
export function getGenres() {
  return loadGenres().filter(g => g);
}
