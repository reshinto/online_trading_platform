import React from "react";
import Title from "../components/companyInfo/Title";
import SetChart from "../components/graphs/SetChart";
import AdvancedStats from "../components/companyInfo/AdvancedStats";
import KeyStats from "../components/companyInfo/KeyStats";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {this.props.multi !== null ? (
          <Paper elevation={0} style={{ height: "95vh", overflowY: "scroll" }}>
            <Title />
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
                <AdvancedStats height={300} />
              </Grid>
              <Grid item md={6}>
                <KeyStats height={300} />
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
