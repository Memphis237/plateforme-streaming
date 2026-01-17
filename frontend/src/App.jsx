import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./components/Home";
import {Films} from "./components/Films";
import {Series} from "./components/Series";
import {Genres} from "./components/Genres";
import {GenreDetails} from "./components/GenreDetails";
import DetailsFilms from "./components/DetailsFilms";
import DetailsSeries from "./components/DetailsSeries";
import Login from "./components/Login";
import Signup from "./components/Signup";



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Films" element={<Films/>} />
          <Route path="/Series" element={<Series/>} />
          <Route path="/Genres" element={<Genres/>} />
          <Route path="/genre/:id" element={<GenreDetails/>} />
          <Route path="/movie/:id" element={<DetailsFilms/>} />
          <Route path="/serie/:id" element={<DetailsSeries/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
