import React from "react";
import { Link, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        {this.props.isAuthenticated ? (
          <button onClick={this.props.logout}>Logout</button>
        ) : (
          <div>
            <div>
              <Link to="/login">Login</Link>
            </div>

            <NavLink to="/signup/">Signup</NavLink>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Navbar)
);
