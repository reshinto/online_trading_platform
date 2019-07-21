import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions/authAction";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    showPassword: false
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    this.props.onAuth(username, email, password1, password2);
    // this.props.history.push("/");
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { username, email, password1, password2 } = this.state;
    const { error } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <DialogContent>
          <TextField
            type="text"
            name="username"
            value={username}
            onChange={this.onChange("username")}
            autoFocus
            margin="dense"
            label="Username"
            error={error !== null && error["username"] !== undefined}
            helperText={
              error ? (error.username ? error.username : "") : ""
            }
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type="email"
            name="email"
            value={email}
            onChange={this.onChange("email")}
            margin="dense"
            label="Email"
            error={error !== null && error["email"] !== undefined}
            helperText={
              error ? (error.email ? error.email : "") : ""
            }
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type={this.state.showPassword ? "text" : "password"}
            label="Password"
            value={password1}
            onChange={this.onChange("password1")}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={error !== null && error["password1"] !== undefined}
            helperText={
              error ? (error.password1 ? error.password1 : "") : ""
            }
            autoComplete="mew-password"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            type={this.state.showPassword ? "text" : "password"}
            label="Confirm Password"
            value={password2}
            onChange={this.onChange("password2")}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={
              error !== null &&
              (error["password2"] !== undefined || password1 !== password2)
            }
            helperText={
              error
                ? error.password2
                  ? error.password2
                  : error.non_field_errors
                : ""
            }
            fullWidth
            autoComplete="mew-password"
          />
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center"
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

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error
  };
};

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
