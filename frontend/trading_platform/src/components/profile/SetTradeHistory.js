import React from "react";
import Button from "@material-ui/core/Button";
import PortfolioHistory from "../portfolio/PortfolioHistory";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function SetTradeHistory(props) {
  const { isClicked, handleOpen, handleClose } = props;
  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Expand View
      </Button>
      <Dialog open={isClicked} onClose={handleClose} maxWidth="xl">
        <DialogContent>
          <PortfolioHistory />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SetTradeHistory;
