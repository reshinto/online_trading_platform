import React from "react";
import SetChart from "../components/graphs/SetChart";
import SetNews from "../components/news/SetNews";
import CompanyProfile from "../components/companyInfo/CompanyProfile";
import AdvancedStats from "../components/companyInfo/AdvancedStats";
import KeyStats from "../components/companyInfo/KeyStats";
import BalanceSheet from "../components/companyInfo/BalanceSheet";
import CashFlow from "../components/companyInfo/CashFlow";
import IncomeStatement from "../components/companyInfo/IncomeStatement";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class Dashboard extends React.Component {
  default = this.props.multi;

  render() {
    return (
      <Paper elevation={0} style={{ height: "95vh", overflowY: "scroll" }}>
        <Grid container style={{ paddingLeft: 10, paddingTop: 10 }}>
          <Typography component="div" variant="h5">
            {this.props.multi !== null ? this.props.multi[0].name : <br />}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={8}
          wrap="wrap"
          justify="space-between"
          style={{ padding: 10, position: "relative", zIndex: 1 }}
        >
          <Grid item xs={12}>
            <SetChart height={600} />
          </Grid>
          <Grid item md={6}>
            <CompanyProfile height={300} />
          </Grid>
          <Grid item md={6}>
            <SetNews height={300} />
          </Grid>
          <Grid item md={6}>
            <AdvancedStats height={300} />
          </Grid>
          <Grid item md={6}>
            <KeyStats height={300} />
          </Grid>
          <Grid item md={6}>
            <BalanceSheet height={300} />
          </Grid>
          <Grid item md={6}>
            <CashFlow height={300} />
          </Grid>
          <Grid item md={6}>
            <IncomeStatement height={300} />
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
)(Dashboard);
