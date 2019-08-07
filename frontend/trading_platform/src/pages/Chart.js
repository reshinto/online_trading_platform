import React from "react";
import SetChart from "../components/graphs/SetChart";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Title from "./Title";

class Chart extends React.Component {
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
          <Grid item xs={12}>
            <SetChart height={window.innerHeight - 200} />
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
)(Chart);
