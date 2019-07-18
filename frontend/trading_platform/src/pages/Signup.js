import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    if (password1 !== password2) {
      console.log("Passwords do not match");
    } else {
      this.props.onAuth(username, email, password1, password2);
      this.props.history.push("/");
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password1, password2 } = this.state;
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password1"
              onChange={this.onChange}
              value={password1}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={this.onChange}
              value={password2}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
