import React from "react";
import AdvancedStats from "../components/companyInfo/AdvancedStats";
import KeyStats from "../components/companyInfo/KeyStats";
import BalanceSheet from "../components/companyInfo/BalanceSheet";
import CashFlow from "../components/companyInfo/CashFlow";
import IncomeStatement from "../components/companyInfo/IncomeStatement";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Title from "./Title";

class Financials extends React.Component {
  default = this.props.multi;

  render() {
    return (
      <Paper elevation={0} style={{ height: "95vh", overflowY: "scroll" }}>
        <Title />
        <Grid
          container
          spacing={8}
          wrap="wrap"
          justify="space-between"
          style={{ padding: 10, position: "relative", zIndex: 1 }}
        >
          <Grid item md={6}>
            <CashFlow />
          </Grid>
          <Grid item md={6}>
            <IncomeStatement />
          </Grid>
          <Grid item md={6}>
            <KeyStats />
          </Grid>
          <Grid item md={6}>
            <BalanceSheet />
          </Grid>
          <Grid item md={6}>
            <AdvancedStats />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi
  };
};

export default connect(
  mapStateToProps,
  null
)(Financials);
