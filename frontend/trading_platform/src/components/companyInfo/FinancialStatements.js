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
    range: "Advanced Stats",
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
    let { range } = this.state;
    if (type !== undefined) {
      this.setState({ range: type });
      this.getStatement(type, multi);
    } else {
      this.getStatement(range, multi);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi } = this.props;
    const { range } = this.state;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getStatement(range, multi);
      }
      if (range !== prevState.range) {
        this.getStatement(range, multi);
      }
    }
  }

  getStatement = (range, symbol) => {
    if (symbol[0] !== undefined) {
      const sym = symbol[0].value;
      if (range === "Advanced Stats") {
        this.props.getAdvStats(sym);
      } else if (range === "Key Stats") {
        this.props.getKeyStats(sym);
      } else if (range === "Balance Sheet") {
        this.props.getBalanceSheet(sym);
      } else if (range === "Cash Flow") {
        this.props.getCashFlow(sym);
      } else if (range === "Income Statement") {
        this.props.getIncomeStatement(sym);
      }
    }
  };

  handleRangeChange = e => {
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
    const { range } = this.state;
    const statement = {
      "Advanced Stats": advStats,
      "Key Stats": keyStats,
      "Balance Sheet": balanceSheet.balancesheet,
      "Cash Flow": cashFlow.cashflow,
      "Income Statement": incomeStatement.income
    };
    const arr = [];
    let oldStatement;
    if (statement[range] !== undefined) {
      if (range === "Advanced Stats" || range === "Key Stats")
        oldStatement = statement[range];
      else oldStatement = statement[range][0];
      for (let [key, value] of Object.entries(oldStatement)) {
        if (typeof value === "number") value = currencyFormat(value)
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
                  <b>{range}</b>
                </Typography>
              </span>
              <span>
                <Range
                  {...this.state}
                  handleRangeChange={this.handleRangeChange}
                  name="Select Type"
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
          <div>loading...</div>
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
