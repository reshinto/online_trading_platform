import React from "react";
import { connect } from "react-redux";
import { getData, getCloudData } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import Range from "./Range";
import CandleStickChart from "./CandleStickChart";

class SetChart extends React.Component {
  state = {
    symbol: [{ label: "SNAP", value: "SNAP" }],
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
    this.getCloudData(this.state.symbol, this.state.cparameter);
  }

  componentDidUpdate(prevProps, prevState) {
    const { symbol, cparameter } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.setState({
          symbol: multi
        });
        this.getCloudData(multi, cparameter);
      }
      if (cparameter !== prevState.cparameter) {
        this.setState({
          cparameter: cparameter
        });
        this.getCloudData(symbol, cparameter);
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
      <React.Fragment>
        {this.props.cloudData.length !== 0 ? (
          <Paper elevation={2}>
            <Range {...this.state} handleRangeChange={this.handleRangeChange} />
            <CandleStickChart data={this.props.cloudData} {...this.state} />
          </Paper>
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
