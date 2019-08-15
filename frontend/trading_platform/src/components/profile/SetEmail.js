import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UpdateData from "./UpdateData";

function SetEmail(props) {
  const { userData, handleOpen, handleClose, isClicked } = props;
  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Email</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Typography variant="body1">{userData.email}</Typography>
      </td>
      <td>
        <Button color="primary" onClick={handleOpen}>
          EDIT
        </Button>
        <UpdateData
          handleClose={handleClose}
          isClicked={isClicked}
          dataType="email"
        />
      </td>
    </tr>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData
  };
};

export default connect(mapStateToProps)(SetEmail);
