import React from "react";
import { connect } from "react-redux";
import { updateUserData, getUserData } from "../../redux/actions/userAction";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class UpdateData extends React.Component {
  state = {
    data: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { dataType, userData } = this.props;
    let newData;
    if (dataType === "email") {
      newData = {
        username: userData.username,
        email: data
      };
    } else if (dataType === "username") {
      newData = {
        username: data
      };
    }
    this.props.updateUserData(newData);
    this.setState({ data: "" });
    this.props.getUserData();
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  idle = () => {
    setTimeout(() => {
      if (this.props.error === null) this.props.handleClose();
    }, 500);
  };

  delayedError = () => {
    setTimeout(() => {
      if (this.props.error === null) this.props.handleClose();
    }, 500);
  };

  render() {
    const { data } = this.state;
    const { handleClose, isClicked, dataType, error } = this.props;

    return (
      <Dialog
        open={isClicked}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">{dataType}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new {dataType} to update.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="data"
              id="data"
              label={`${dataType}`}
              type="text"
              onChange={this.onChange("data")}
              value={data}
              placeholder={`${dataType}`}
              error={error !== null && error[`${dataType}`] !== undefined}
              helperText={
                error ? (error[`${dataType}`] ? error[`${dataType}`] : "") : ""
              }
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
                error === null && data !== "" ? this.delayedError : this.idle
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
    userData: state.userReducer.userData,
    error: state.userReducer.updateError
  };
};

const mapDispatchToProps = {
  updateUserData,
  getUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateData);
