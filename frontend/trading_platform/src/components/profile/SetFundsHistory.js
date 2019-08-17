import React from "react";
import Button from "@material-ui/core/Button";
import FundsHistory from "../portfolio/FundsHistory";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function SetFundsHistory(props) {
  const { isClicked, handleOpen, handleClose } = props;

  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Expand View
      </Button>
      <Dialog open={isClicked} onClose={handleClose} maxWidth="xl">
        <DialogContent>
          <FundsHistory />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SetFundsHistory;
