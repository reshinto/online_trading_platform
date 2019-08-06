import React from "react";
import { connect } from "react-redux";
import { getData, getCloudData } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import Range from "./Range";
import ChartSelect from "./ChartSelect";
import CandleStickChart from "./CandleStickChart";
import Typography from "@material-ui/core/Typography";

class SetChart extends React.Component {
  state = {
    infix: "symbols",
    option: null,
    option2: null,
    parameter2: null,
    cinfixKey: "stock",
    csuffixKey: "chart",
    cparameter: "",
    cquery: null,
    height: this.props.height,
    margin: { left: 60, right: 60, top: 30, bottom: 50 }
  };

  componentDidMount() {
    this.getCloudData(this.props.multi, this.state.cparameter);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cparameter } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getCloudData(multi, cparameter);
      }
      if (cparameter !== prevState.cparameter) {
        this.setState({
          cparameter: cparameter
        });
        this.getCloudData(multi, cparameter);
      }
    }
  }

  getCloudData = (symbol, cparameter) => {
    this.props.getCloudData(
      this.state.cinfixKey,
      symbol[0].value,
      this.state.csuffixKey,
      cparameter,
      this.state.cquery
    );
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Paper elevation={2}>
        {this.props.cloudData.length !== 0 ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between"
              }}
            >
              <Range
                {...this.state}
                handleRangeChange={this.handleRangeChange}
              />
              <Typography variant="h5">
                {this.props.multi !== null ? this.props.multi[0].value : ""}
              </Typography>
              <ChartSelect
                {...this.state}
                handleRangeChange={this.handleRangeChange}
              />
            </div>
            <CandleStickChart
              data={this.props.cloudData}
              {...this.state}
              multi={this.props.multi}
            />
          </div>
        ) : (
          ""
        )}
      </Paper>
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
