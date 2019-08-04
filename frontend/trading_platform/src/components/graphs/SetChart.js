import React from "react";
import { connect } from "react-redux";
import { getData, getCloudData } from "../../redux/actions/iexAction";
import Grid from "@material-ui/core/Grid";
import CandleStickChart from "./CandleStickChart";

class SetChart extends React.Component {
  state = {
    parameter: "SNAP",
    infix: "symbols",
    option: null,
    option2: null,
    parameter2: null,
    cinfixKey: "stock",
    csuffixKey: "chart",
    cparameter: "",
    cquery: null,
    height: 600,
    margin: { left: 60, right: 60, top: 30, bottom: 50 }
  };

  componentDidMount() {
    this.getCloudData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.multi !== null) {
      if (this.props.multi !== prevProps.multi) {
        this.setState({
          parameter: this.props.multi.map(data => data.value)[0]
        });
        this.getCloudData();
      }
      if (this.state.cparameter !== prevState.cparameter) {
        this.getCloudData();
      }
    }
  }

  getCloudData = () => {
    this.props.getCloudData(
      this.state.cinfixKey,
      this.state.parameter,
      this.state.csuffixKey,
      this.state.cparameter,
      this.state.cquery
    );
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.cloudData.length !== 0 ? (
          <Grid
            container
            spacing={24}
            style={{ position: "relative", zIndex: 1 }}
          >
            <CandleStickChart
              data={this.props.cloudData}
              {...this.state}
              handleRangeChange={this.handleRangeChange}
            />
          </Grid>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    // data: state.iexReducer.data,
    cloudData: state.iexReducer.cloudData,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  // getData,
  getCloudData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetChart);
