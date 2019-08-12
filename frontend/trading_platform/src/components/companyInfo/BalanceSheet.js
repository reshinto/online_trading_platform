import React from "react";
import { connect } from "react-redux";
import { getBalanceSheet } from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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

class BalanceSheet extends React.Component {
  componentDidMount() {
    this.getBalanceSheet(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getBalanceSheet(multi);
      }
    }
  }

  getBalanceSheet = symbol => {
    if(symbol[0] !== undefined)
      this.props.getBalanceSheet(symbol[0].value);
  };

  render() {
    const { balanceSheet, classes } = this.props;
    const balanceSheetArray = [];
    if (balanceSheet.balancesheet !== undefined) {
      for (let [key, value] of Object.entries(balanceSheet.balancesheet[0])) {
        balanceSheetArray.push({ key: key, value: value });
      }
    }

    return (
      <React.Fragment>
        {balanceSheetArray.length !== 0 ? (
          <div className={classes.root} style={{ height: this.props.height }}>
            <Typography className={classes.title} gutterBottom>
              <b>Balance Sheet</b>
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {balanceSheetArray.map((row, i) => (
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
    balanceSheet: state.iexReducer.balanceSheet,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getBalanceSheet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BalanceSheet));
