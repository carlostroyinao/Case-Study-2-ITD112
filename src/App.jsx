import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Data from "./pages/Data";
import Import from "./pages/Import";
import Dashboard from "./pages/Dashboard";

// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/fontawesome.css";
import "../assets/css/templatemo-plot-listing.css";
import "../assets/css/animated.css";
import "../assets/css/owl.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/import" element={<Import />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
