import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import BaseRouter from "./Routes";

class Platform extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <BaseRouter />
      </Router>
    );
  }
}

export default Platform;
