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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Range from "../graphs/Range";
import { formatStr, currencyFormat } from "../../redux/utility.js";
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
    last: "?last=4",
    financials: "Advanced Stats",
    period: "Annual",
    periodList: ["Annual", "Quarter"],
    financialList: [
      "Advanced Stats",
      "Key Stats",
      "Cash Flow",
      "Balance Sheet",
      "Income Statement"
    ]
  };

  componentDidMount() {
    let { type, multi } = this.props;
    let { financials, last, period } = this.state;
    let query = last + "&period=" + period.toLowerCase();
    if (type !== undefined) {
      this.setState({ financials: type });
      this.getStatement(type, multi, query);
    } else {
      this.getStatement(financials, multi, query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi } = this.props;
    let { financials, last, period } = this.state;
    let query = last + "&period=" + period.toLowerCase();
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getStatement(financials, multi, query);
      }
      if (financials !== prevState.financials) {
        this.getStatement(financials, multi, query);
      }
      if (period !== prevState.period) {
        this.getStatement(financials, multi, query);
      }
    }
  }

  getStatement = (financials, symbol, query) => {
    if (symbol[0] !== undefined) {
      const sym = symbol[0].value;
      if (financials === "Advanced Stats") {
        this.props.getAdvStats(sym);
      } else if (financials === "Key Stats") {
        this.props.getKeyStats(sym);
      } else if (financials === "Balance Sheet") {
        this.props.getBalanceSheet(sym, query);
      } else if (financials === "Cash Flow") {
        this.props.getCashFlow(sym, query);
      } else if (financials === "Income Statement") {
        this.props.getIncomeStatement(sym, query);
      }
    }
  };

  handleChange = e => {
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
    const { financials, financialList, period, periodList } = this.state;
    const statement = {
      "Advanced Stats": advStats,
      "Key Stats": keyStats,
      "Balance Sheet": balanceSheet.balancesheet,
      "Cash Flow": cashFlow.cashflow,
      "Income Statement": incomeStatement.income
    };
    const arr = [];
    let subArr;
    let oldStatement;
    if (statement[financials] !== undefined) {
      oldStatement = statement[financials];
      if (financials === "Advanced Stats" || financials === "Key Stats") {
        for (let [key, value] of Object.entries(oldStatement)) {
          if (!isNaN(Number(value))) {
            if (!Number.isInteger(Number(value)))
              value = currencyFormat(Number(value), 2);
            else value = currencyFormat(Number(value), 0);
          }
          if (value === "0") value = "";
          arr.push({ key: key, value: value });
        }
      } else {
        for (let i = 0; i < oldStatement.length; i++) {
          subArr = [];
          for (let [key, value] of Object.entries(oldStatement[i])) {
            if (!isNaN(Number(value))) {
              if (!Number.isInteger(Number(value)))
                value = currencyFormat(Number(value), 2);
              else value = currencyFormat(Number(value), 0);
            }
            if (value === "0") value = "";
            subArr.push({ key: key, value: value });
          }
          arr.push(subArr);
        }
      }
    }

    return (
      <React.Fragment>
        {arr.length !== 0 ? (
          <div className={classes.root} style={{ height: this.props.height }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
                // flexWrap: "wrap"
              }}
            >
              <span style={{ flexBasis: "60%" }}>
                <Typography className={classes.title} gutterBottom>
                  <b>{financials}</b>
                </Typography>
              </span>
              {financials !== "Advanced Stats" && financials !== "Key Stats" ? (
                <span>
                  <Range
                    handleRangeChange={this.handleChange}
                    name="period"
                    range={period}
                    list={periodList}
                  />
                </span>
              ) : (
                ""
              )}
              <span>
                <Range
                  handleRangeChange={this.handleChange}
                  name="financials"
                  range={financials}
                  list={financialList}
                />
              </span>
            </div>
            <Divider />
            <Table>
              {financials === "Advanced Stats" || financials === "Key Stats" ? (
                <TableBody>
                  {arr.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <i>{formatStr(row.key)}</i>
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>{formatStr(arr[0][0].key)}</b>
                      </TableCell>
                      <TableCell align="right">{arr[3][0].value}</TableCell>
                      <TableCell align="right">{arr[2][0].value}</TableCell>
                      <TableCell align="right">{arr[1][0].value}</TableCell>
                      <TableCell align="right">{arr[0][0].value}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arr[0].slice(1).map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <i>{formatStr(arr[0].slice(1)[i].key)}</i>
                        </TableCell>
                        <TableCell align="right">
                          {arr[3].slice(1)[i].value}
                        </TableCell>
                        <TableCell align="right">
                          {arr[2].slice(1)[i].value}
                        </TableCell>
                        <TableCell align="right">
                          {arr[1].slice(1)[i].value}
                        </TableCell>
                        <TableCell align="right">
                          {arr[0].slice(1)[i].value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              )}
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
