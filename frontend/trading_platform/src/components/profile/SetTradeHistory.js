import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PortfolioHistory from "../portfolio/PortfolioHistory";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function SetTradeHistory(props) {
  const {
    tradeHistIsClicked,
    handleTradeHistoryOpen,
    handleTradeHistoryClose
  } = props;
  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Trade History</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Button color="primary" onClick={handleTradeHistoryOpen}>
          View
        </Button>
        <Dialog
          open={tradeHistIsClicked}
          onClose={handleTradeHistoryClose}
          maxWidth="xl"
        >
          <DialogContent>
            <PortfolioHistory />
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}

export default SetTradeHistory;
