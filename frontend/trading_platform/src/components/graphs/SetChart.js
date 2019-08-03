import React from "react";
import { connect } from "react-redux";
import { getData, getCloudData } from "../../redux/actions/iexAction";
import LineChart from "./LineChart";
import Grid from "@material-ui/core/Grid";

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
    marginLeft: 60,
    marginRight: 0,
    marginTop: 50,
    marginBottom: 80,
    width: 800,
    height: 800,
    trbl: [10, 10, 30, 10], // [top, right, bottom, left] margins
    defaultData: [
      {
        open: 0,
        date: new Date("2019-01-01")
      }
    ]
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
          <Grid container spacing={24}>
            <LineChart
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

// this.props.getData(this.state.infix, this.state.option, null, null, this.state.parameter);
// this.props.getData("histDay", null, null, null, this.state.days);
// this.props.getData(
//   this.state.infix,
//   this.state.option,
//   this.state.option2,
//   this.state.parameter2,
//   this.state.parameter
// );
