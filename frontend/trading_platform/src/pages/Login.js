import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
    // this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            autoComplete="password"
            margin="dense"
            label="Password"
            fullWidth
          />
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button color="primary" type="submit">
            Login
          </Button>
        </DialogActions>
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
