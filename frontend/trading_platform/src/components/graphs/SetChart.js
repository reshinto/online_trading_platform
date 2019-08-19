import React from "react";
import { connect } from "react-redux";
import { getChart } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import ChartSelect from "./ChartSelect";
import Loading from "../Loading";

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
    if (symbol[0] !== undefined) this.props.getChart(symbol[0].value, range);
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { chart } = this.props;

    return (
      <React.Fragment>
        {this.props.chart.length !== 0 ? (
          <Paper
            style={{ padding: 10 }}
            elevation={2}
          >
            <ChartSelect
              {...this.state}
              {...this.props}
              data={chart}
              handleRangeChange={this.handleRangeChange}
            />
          </Paper>
        ) : (
          <Loading />
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
