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

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    showPassword: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
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
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
