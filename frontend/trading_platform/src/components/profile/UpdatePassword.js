import React from "react";
import { connect } from "react-redux";
import { updateUserPassword } from "../../redux/actions/userAction";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class UpdatePassword extends React.Component {
  state = {
    old_password: "",
    new_password: "",
    showPassword: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { old_password, new_password } = this.state;
    let newData = {
      old_password,
      new_password
    };
    this.props.updateUserPassword(newData);
    this.setState({ old_password: "", new_password: "" });
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  idle = () => {
    setTimeout(()=>{
      if (this.props.error === null) this.props.handleClose()
    },500)
  }

  render() {
    const { old_password, new_password } = this.state;
    const { handleClose, isClicked, error } = this.props;

    return (
      <Dialog
        open={isClicked}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the old password.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="old_password"
              id="old_password"
              label="Old Password"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.onChange("old_password")}
              value={old_password}
              autoComplete="old-password"
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
              error={error !== null && error["old_password"] !== undefined}
              helperText={
                error ? (error.old_password ? error.old_password : "") : ""
              }
              fullWidth
            />
            <DialogContentText>
              Enter the new password to update.
            </DialogContentText>
            <TextField
              margin="dense"
              name="new_password"
              id="new_password"
              label="New Password"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.onChange("new_password")}
              value={new_password}
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
              error={error !== null && error["new_password"] !== undefined}
              helperText={
                error ? (error.new_password ? error.new_password : "") : ""
              }
              autoComplete="new-password"
              fullWidth
            />
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            >
            <Button
              onClick={
                error === null && old_password !== "" && new_password !== ""
                  ? handleClose
                  : this.idle
              }
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.userReducer.updateError
  };
};

const mapDispatchToProps = {
  updateUserPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassword);
