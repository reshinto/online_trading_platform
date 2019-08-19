import React from "react";
import { connect } from "react-redux";
import {
  getAdvStats,
  getKeyStats,
  getBalanceSheet,
  getCashFlow,
  getIncomeStatement
} from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Range from "../graphs/Range";
import {currencyFormat} from "../../redux/utility.js";
import Loading from "../Loading";

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

class FinancialStatements extends React.Component {
  state = {
    financials: "Advanced Stats",
    list: [
      "Advanced Stats",
      "Key Stats",
      "Cash Flow",
      "Balance Sheet",
      "Income Statement"
    ]
  };

  componentDidMount() {
    let { type, multi } = this.props;
    let { financials } = this.state;
    if (type !== undefined) {
      this.setState({ financials: type });
      this.getStatement(type, multi);
    } else {
      this.getStatement(financials, multi);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi } = this.props;
    const { financials } = this.state;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getStatement(financials, multi);
      }
      if (financials !== prevState.financials) {
        this.getStatement(financials, multi);
      }
    }
  }

  getStatement = (financials, symbol) => {
    if (symbol[0] !== undefined) {
      const sym = symbol[0].value;
      if (financials === "Advanced Stats") {
        this.props.getAdvStats(sym);
      } else if (financials === "Key Stats") {
        this.props.getKeyStats(sym);
      } else if (financials === "Balance Sheet") {
        this.props.getBalanceSheet(sym);
      } else if (financials === "Cash Flow") {
        this.props.getCashFlow(sym);
      } else if (financials === "Income Statement") {
        this.props.getIncomeStatement(sym);
      }
    }
  };

  handlefinancialsChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      advStats,
      keyStats,
      balanceSheet,
      cashFlow,
      incomeStatement,
      classes
    } = this.props;
    const { financials } = this.state;
    const statement = {
      "Advanced Stats": advStats,
      "Key Stats": keyStats,
      "Balance Sheet": balanceSheet.balancesheet,
      "Cash Flow": cashFlow.cashflow,
      "Income Statement": incomeStatement.income
    };
    const arr = [];
    let oldStatement;
    if (statement[financials] !== undefined) {
      if (financials === "Advanced Stats" || financials === "Key Stats")
        oldStatement = statement[financials];
      else oldStatement = statement[financials][0];
      for (let [key, value] of Object.entries(oldStatement)) {
        if (typeof value === "number") value = currencyFormat(value, 2)
        arr.push({ key: key, value: value });
      }
    }

    return (
      <React.Fragment>
        {arr.length !== 0 ? (
          <div className={classes.root} style={{ height: this.props.height }}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <span>
                <Typography className={classes.title} gutterBottom>
                  <b>{financials}</b>
                </Typography>
              </span>
              <span>
                <Range
                  {...this.state}
                  handleRangeChange={this.handlefinancialsChange}
                  name="financials"
                  range={financials}
                />
              </span>
            </div>
            <Divider />
            <Table>
              <TableBody>
                {arr.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    advStats: state.iexReducer.advStats,
    keyStats: state.iexReducer.keyStats,
    balanceSheet: state.iexReducer.balanceSheet,
    cashFlow: state.iexReducer.cashFlow,
    incomeStatement: state.iexReducer.incomeStatement,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getAdvStats,
  getKeyStats,
  getBalanceSheet,
  getCashFlow,
  getIncomeStatement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FinancialStatements));
