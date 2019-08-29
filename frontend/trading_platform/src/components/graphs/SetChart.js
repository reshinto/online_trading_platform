import React from "react";
import { connect } from "react-redux";
import { getChart, getIntraday } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import ChartSelect from "./ChartSelect";
import Loading from "../Loading";

class SetChart extends React.Component {
  state = {
    range: "",
    height: this.props.height,
    margin: { left: 60, right: 60, top: 30, bottom: 50 },
    intraDayData: []
  };

  componentDidMount() {
    this.getChart(this.props.multi, this.state.range);
    this.getIntraday(this.props.multi);
    this.timer = setInterval(() => this.addIntraDayData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
        if (range !== "intraday") this.getChart(multi, range);
      }
    }
  }

  getChart = (symbol, range) => {
    if (symbol[0] !== undefined) this.props.getChart(symbol[0].value, range);
  };

  getIntraday = symbol => {
    if (symbol[0] !== undefined) this.props.getIntraday(symbol[0].value);
  };

  addIntraDayData = () => {
    this.getIntraday(this.props.multi);
    const { intraDayData } = this.state;
    const { intraday } = this.props;
    if (this.state.intraDayData.length === 0) {
      this.setState(state => ({
        intraDayData: state.intraDayData.concat(this.props.intraday)
      }));
    } else {
      if (
        intraDayData[intraDayData.length - 1].minute !==
        intraday[intraday.length - 1].minute
      ) {
        const data = [];
        data.push(intraday[intraday.length - 1]);
        this.setState(state => ({
          intraDayData: state.intraDayData.concat(data)
        }));
      }
    }
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { chart, intraday } = this.props;
    const { range, intraDayData } = this.state;

    return (
      <React.Fragment>
        {chart.length !== 0 || intraday.length !== 0 ? (
          <Paper style={{ padding: 10 }} elevation={2}>
            <ChartSelect
              {...this.state}
              {...this.props}
              data={range !== "intraday" ? chart : intraDayData}
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
    intraday: state.iexReducer.intraday,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getChart,
  getIntraday
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetChart);
