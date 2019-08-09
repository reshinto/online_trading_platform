import React from "react";
import { connect } from "react-redux";
import { getCashFlow } from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    overflowY: "auto"
  },
  title: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    fontSize: 24
  }
});

class CashFlow extends React.Component {
  componentDidMount() {
    this.getCashFlow(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getCashFlow(multi);
      }
    }
  }

  getCashFlow = symbol => {
    this.props.getCashFlow(symbol[0].value);
  };

  render() {
    const { cashFlow, classes } = this.props;
    const cashFlowArray = [];
    if (cashFlow.cashflow !== undefined) {
      for (let [key, value] of Object.entries(cashFlow.cashflow[0])) {
        cashFlowArray.push({ key: key, value: value });
      }
    }

    return (
      <React.Fragment>
        {cashFlowArray.length !== 0 ? (
          <Paper className={classes.root} style={{ height: this.props.height }}>
            <Typography className={classes.title} gutterBottom>
              <b>Cash Flow</b>
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {cashFlowArray.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cashFlow: state.iexReducer.cashFlow,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getCashFlow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CashFlow));
