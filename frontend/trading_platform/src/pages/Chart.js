import React from "react";
import SetChart from "../components/graphs/SetChart";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Title from "../components/companyInfo/Title";

class Chart extends React.Component {
  render() {
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
                <SetChart height={window.innerHeight - 250} />
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
)(Chart);
