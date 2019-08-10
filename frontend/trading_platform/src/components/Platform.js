import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";
import BaseRouter from "./Routes";

class Platform extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <Navbar {...this.props} />
        <BaseRouter />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platform);
