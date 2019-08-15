import React from "react";
import { connect } from "react-redux";
import { addFunds } from "../../redux/actions/fundsAction";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FundInput extends React.Component {
  state = {
    amount: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { funds } = this.props;
    const oldFund = funds[funds.length - 1].totalFund;
    const transactionType = "DEPOSIT";
    const amount = this.state.amount;
    const totalFund = oldFund + parseFloat(amount);
    const fund = {
      transactionType,
      amount,
      totalFund
    };
    this.props.addFunds(fund);
    this.setState({ amount: "" });
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  render() {
    const { amount } = this.state;
    const { handleClose, isClicked } = this.props;
    return (
      <Dialog
        open={isClicked}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the amount to deposit into your funds.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="amount"
              id="amount"
              label="Amount"
              type="number"
              onChange={this.onChange("amount")}
              value={amount}
              placeholder="0"
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
              onClick={handleClose}
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
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  addFunds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundInput);
