import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

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
      // this.props.history.push("/");
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password1, password2 } = this.state;
    return (

      <form onSubmit={this.onSubmit}>
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
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
            margin="dense"
            label="Email"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type="password"
            name="password1"
            value={password1}
            onChange={this.onChange}
            margin="dense"
            label="Password"
            autoComplete="password"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type="password"
            name="password2"
            value={password2}
            onChange={this.onChange}
            margin="dense"
            label="Confirm password"
            autoComplete="password"
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
            Register
          </Button>
        </DialogActions>
      </form>
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
