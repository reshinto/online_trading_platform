import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../redux/actions/authAction";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.onChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          placeholder="Password"
          autoComplete="password"
        />

        <button type="submit">Login</button>
        <NavLink to="/signup/">signup</NavLink>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
