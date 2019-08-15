import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UpdatePassword from "./UpdatePassword";

function SetPassword(props) {
  const { handleOpen, handleClose, isClicked } = props;
  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Password</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Button color="primary" onClick={handleOpen}>
          CHANGE PASSWORD
        </Button>
        <UpdatePassword handleClose={handleClose} isClicked={isClicked} />
      </td>
    </tr>
  );
}

export default SetPassword;
