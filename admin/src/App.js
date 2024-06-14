import "./App.css";
import MainLayout from "./layouts";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Rating from "pages/Rating/Rating";
import Comment from "pages/Comment/Comment";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Users from "pages/Users";
import Pricing from "pages/Pricing";
import Movies, { AddMovie } from "pages/Movies";
import Genres, { AddGenre } from "pages/Genres";
import PrivateRouter from "PrivateRouter";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route exact path="/" element={<PrivateRouter />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          <Route exact path="/" element={<PrivateRouter />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rating" element={<Rating />} />
              <Route path="comment" element={<Comment />} />
              <Route path="package" element={<Pricing />} />

              <Route path="/user" element={<Users />}></Route>
              <Route path="/movie/list-movies" element={<Movies />}></Route>
              <Route path="/movie/add-movies" element={<AddMovie />}></Route>
              <Route path="/genre/list-genres" element={<Genres />}></Route>
              <Route path="/genre/add-genre" element={<AddGenre />}></Route>

              <Route path="/*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
