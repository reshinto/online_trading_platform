import React from "react";
import Title from "../components/companyInfo/Title";
import SetChart from "../components/graphs/SetChart";
import FinancialStatements from "../components/companyInfo/FinancialStatements";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

class Dashboard extends React.Component {
  render() {
    const chartHeight = Math.floor(window.innerHeight / 4 * 2);
    const statsHeight =  Math.floor(window.innerHeight / 4 * 1);
    return (
      <div>
        {this.props.multi !== null ? (
          <Paper
            elevation={0}
            style={{
              height: "95vh",
              overflowY: "scroll",
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Title />
            <Grid
              container
              spacing={8}
              wrap="wrap"
              justify="space-between"
              style={{ padding: 10, position: "relative", zIndex: 1 }}
            >
              <Grid item xs={12}>
                <SetChart height={chartHeight} />
              </Grid>
              <Grid item md={6}>
                <FinancialStatements type="Advanced Stats" height={statsHeight} />
              </Grid>
              <Grid item md={6}>
                <FinancialStatements type="Cash Flow" height={statsHeight} />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <br />
        )}
      </div>
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
