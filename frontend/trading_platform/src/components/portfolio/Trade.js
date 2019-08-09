import React from "react";
import { connect } from "react-redux";
import { addTrade } from "../../redux/actions/tradeAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class Trade extends React.Component {
  state = {
    transaction: "",
    cashOnHand: "",
    quantity: "",
    price: "",
    owner: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { transaction, cashOnHand, quantity, price, owner } = this.state;
    const symbol = this.props.multi[0].value;
    const company = this.props.multi[0].name;
    const trade = {
      symbol,
      company,
      transaction,
      cashOnHand,
      quantity,
      price,
      owner
    };
    this.props.addTrade(trade);
    this.props.onSubmit()
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { multi, classes } = this.props;
    const { transaction, cashOnHand, quantity, price, owner } = this.state;
    return (
      <div className={classes.root}>
        <form onSubmit={this.onSubmit} className={classes.root}>
          <DialogContent>
            <div>Symbol: {multi[0].value}</div>
            <div>Company: {multi[0].name}</div>
          </DialogContent>
          <DialogContent>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="transaction-native-required">
                Transaction
              </InputLabel>
              <Select
                native
                value={transaction}
                onChange={this.onChange}
                name="transaction"
                inputProps={{
                  id: "transaction-native-required"
                }}
              >
                <option value="" />
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              name="cashOnHand"
              margin="dense"
              label="Cash on Hand"
              onChange={this.onChange}
              value={cashOnHand}
              className={classes.formControl}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              name="quantity"
              margin="dense"
              label="Quantity"
              onChange={this.onChange}
              value={quantity}
              className={classes.formControl}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              name="price"
              margin="dense"
              label="Price"
              onChange={this.onChange}
              value={price}
              className={classes.formControl}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              name="owner"
              margin="dense"
              label="Owner"
              onChange={this.onChange}
              value={owner}
              className={classes.formControl}
            />
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button color="primary" type="submit">Trade</Button>
          </DialogActions>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  addTrade
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Trade));
