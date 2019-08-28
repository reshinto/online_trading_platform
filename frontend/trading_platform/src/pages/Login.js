import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/authAction";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { db } from "../redux/utility";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    showPassword: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    // this.props.history.push("/");
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { username, password } = this.state;
    const { error } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <DialogContent>
            <TextField
              type="text"
              name="username"
              value={username}
              onChange={this.onChange("username")}
              autoFocus
              margin="dense"
              label="Username"
              error={error !== null && username === ""}
              helperText={
                error && username === "" ? "This field may not be blank." : ""
              }
              autoComplete="username"
              fullWidth
            />
          </DialogContent>

          <DialogContent>
            <TextField
              type={this.state.showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={this.onChange("password")}
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
              error={error !== null}
              helperText={
                error
                  ? error.password
                    ? error.password
                    : error.non_field_errors
                  : ""
              }
              autoComplete="current-password"
              fullWidth
            />
          </DialogContent>

          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button color="primary" type="submit">
              Login
            </Button>
          </DialogActions>
        </form>
        <div
          style={{
            fontSize: 10,
            display: "flex",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <a href={`${db}/password-reset/`}>Forgot password?</a>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error
  };
};

const mapDispatchToProps = {
  login: (username, password) => login(username, password)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
