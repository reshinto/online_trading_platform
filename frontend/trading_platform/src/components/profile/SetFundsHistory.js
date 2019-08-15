import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FundsHistory from "../portfolio/FundsHistory";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function SetFundsHistory(props) {
  const {
    isClicked,
    handleOpen,
    handleClose
  } = props;

  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Funds History</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Button color="primary" onClick={handleOpen}>
          View
        </Button>
        <Dialog
          open={isClicked}
          onClose={handleClose}
          maxWidth="xl"
        >
          <DialogContent>
            <FundsHistory />
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}

export default SetFundsHistory;
