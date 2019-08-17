import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { deleteFunds } from "../../redux/actions/fundsAction";
import Button from "@material-ui/core/Button";
import { currencyFormat } from "../../redux/utility";

const styles = {
  root: {
    padding: 10,
    width: "auto",
    height: "auto",
    overflow: "auto"
  },
  row: {
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  }
};

class FundsHistory extends React.Component {
  state = {
    options: {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false
    }
  };

  render() {
    const { funds, classes } = this.props;
    const { options } = this.state;
    return (
      <div style={{ height: this.props.height }}>
        <table rules="groups">
          <thead>
            <tr>
              <th className={classes.row}>
                <Typography variant="subtitle1">Transaction</Typography>
              </th>
              <th className={classes.row}>
                <Typography variant="subtitle1">Amount</Typography>
              </th>
              <th className={classes.row}>
                <Typography variant="subtitle1">Total Fund</Typography>
              </th>
              <th className={classes.row}>
                <Typography variant="subtitle1">Date</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {funds.map(data => (
              <tr key={data.id}>
                <td className={classes.row}>{data.transactionType}</td>
                <td className={classes.row}>
                  {data.amount === null ? 0 : currencyFormat(data.amount, 2)}
                </td>
                <td className={classes.row}>
                  {data.totalFund === null
                    ? 0
                    : currencyFormat(data.totalFund, 2)}
                </td>
                <td className={classes.row}>
                  {new Date(data.created_at).toLocaleString("en-US", options)}
                </td>
                <td className={classes.row}>
                  <Button onClick={this.props.deleteFunds.bind(this, data.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  deleteFunds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FundsHistory));
