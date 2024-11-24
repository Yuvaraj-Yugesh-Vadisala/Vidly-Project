import 'font-awesome/css/font-awesome.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import NavBar from './components/navBar';
import { Movie } from './components/movies';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';  // Use Navigate instead of Redirect in v6
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Routes>
          {/* Replace 'component' with 'element' and pass JSX */}
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movie />} />

          {/* Use Navigate instead of Redirect */}
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="*" element={<Navigate to="/notFound" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
























// import 'font-awesome/css/font-awesome.css'
// import './App.css';
// import { ToastContainer } from "react-toastify"
// import NavBar from './components/navBar';
// import { Movie } from './components/movies';
// import React from 'react';
// import { Route, Routes, Redirect } from 'react-router-dom';
// import Customers from './components/customers'
// import MovieForm from './components/movieForm'
// import NotFound from './components/notFound'
// import Rentals from './components/rentals'
// import LoginForm from './components/loginForm';
// import RegisterForm from './components/registerForm';




// function App() {
//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <NavBar />
//       <main className='container'>
//         <Routes>
//           <Route path="/loginForm" component={LoginForm}></Route>
//           <Route path="/registerForm" component={RegisterForm} />
//           <Route path="/customers" component={Customers} />
//           <Route path="/rentals" component={Rentals} />
//           <Route path="/notFound" component={NotFound} />
//           <Route path="/rentals" component={Rentals} />
//           <Route path="/movies/:id" component={MovieForm} />
//           <Route path="/movies" component={Movie} />
//           <Redirect from="/" exact to="/movies"></Redirect>
//           <Redirect to='/notFound'></Redirect>
//         </Routes>
//       </main>

//     </React.Fragment>
//   );
// }

// export default App;
