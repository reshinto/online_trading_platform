import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

class Chart extends React.Component {
  default = this.props.multi;

  render() {
    return (
      <Grid container style={{ paddingLeft: 10, paddingTop: 10 }}>
        <Typography component="div" variant="h5">
          {this.props.multi !== null ? this.props.multi[0].name : <br />}
        </Typography>
      </Grid>
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
