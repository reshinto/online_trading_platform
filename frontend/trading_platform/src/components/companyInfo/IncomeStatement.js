import React from "react";
import { connect } from "react-redux";
import { getIncomeStatement } from "../../redux/actions/iexAction";
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

class IncomeStatement extends React.Component {
  componentDidMount() {
    this.getIncomeStatement(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getIncomeStatement(multi);
      }
    }
  }

  getIncomeStatement = symbol => {
    this.props.getIncomeStatement(symbol[0].value);
  };

  render() {
    const { incomeStatement, classes } = this.props;
    const incomeStatementArray = [];
    if (incomeStatement.income !== undefined) {
      for (let [key, value] of Object.entries(incomeStatement.income[0])) {
        incomeStatementArray.push({ key: key, value: value });
      }
    }

    return (
      <React.Fragment>
        {incomeStatementArray.length !== 0 ? (
          <Paper className={classes.root} style={{ height: this.props.height }}>
            <Typography className={classes.title} gutterBottom>
              <b>Income Statement</b>
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {incomeStatementArray.map((row, i) => (
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
    incomeStatement: state.iexReducer.incomeStatement,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getIncomeStatement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(IncomeStatement));
