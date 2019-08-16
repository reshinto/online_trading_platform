import React from "react";
import { connect } from "react-redux";
import { getChart } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import Range from "./Range";
import ChartSelect from "./ChartSelect";
import CandleStickChart from "./CandleStickChart";
import Typography from "@material-ui/core/Typography";

class SetChart extends React.Component {
  state = {
    range: "",
    height: this.props.height,
    margin: { left: 60, right: 60, top: 30, bottom: 50 }
  };

  componentDidMount() {
    this.getChart(this.props.multi, this.state.range);
  }

  componentDidUpdate(prevProps, prevState) {
    const { range } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getChart(multi, range);
      }
      if (range !== prevState.range) {
        this.setState((_prevState, props) => ({
          range: _prevState.range
        }));
        this.getChart(multi, range);
      }
    }
  }

  getChart = (symbol, range) => {
    if (symbol[0] !== undefined)
      this.props.getChart(symbol[0].value, range);
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { multi, chart } = this.props;

    return (
      <React.Fragment>
        {this.props.chart.length !== 0 ? (
          <Paper elevation={2}>
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
                  name="Range"
                />
                <Typography variant="h5">
                  {multi !== null &&
                  multi !== undefined &&
                  multi[0] !== undefined
                    ? multi[0].value
                    : ""}
                </Typography>
                <ChartSelect
                  {...this.state}
                  handleRangeChange={this.handleRangeChange}
                />
              </div>
              <CandleStickChart data={chart} {...this.state} multi={multi} />
            </div>
          </Paper>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    chart: state.iexReducer.chart,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getChart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetChart);
