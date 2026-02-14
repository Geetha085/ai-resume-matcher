import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ResumeForm from "./pages/ResumeForm";
import MatchPage from "./pages/MatchPage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume" element={<ResumeForm />} />
        <Route path="/match" element={<MatchPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
