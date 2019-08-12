import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FundsHistory from "../portfolio/FundsHistory";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function SetFundsHistory(props) {
  const {
    fundsHistIsClicked,
    handleFundsHistoryOpen,
    handleFundsHistoryClose
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
        <Button color="primary" onClick={handleFundsHistoryOpen}>
          View
        </Button>
        <Dialog
          open={fundsHistIsClicked}
          onClose={handleFundsHistoryClose}
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
