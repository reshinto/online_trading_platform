import React from "react";
import Range from "./Range";
import CandleStickChart from "./CandleStickChart";
import HeikinAshiChart from "./HeikinAshiChart";
import AreaChart from "./AreaChart";
import Typography from "@material-ui/core/Typography";

class ChartSelect extends React.Component {
  state = {
    chart: "",
    chartList: ["Candle Stick", "Heikin Ashi", "Area"]
  };

  handleChartChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { range, multi, handleRangeChange } = this.props;
    let { chart } = this.state;
    const selectChart = {
      "Candle Stick": <CandleStickChart {...this.state} {...this.props} />,
      "Heikin Ashi": <HeikinAshiChart {...this.state} {...this.props} />,
      "Area": <AreaChart {...this.state} {...this.props} />
    };

    return (
      <>
      <Typography
        variant="h5"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: -20
          }}
      >
          {multi !== null && multi !== undefined && multi[0] !== undefined
            ? multi[0].value
            : ""}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingLeft: 50,
            paddingRight: 50
          }}
        >
          <Range
            {...this.state}
            handleRangeChange={handleRangeChange}
            name="range"
            range={range}
          />
          <Range
            {...this.state}
            list={this.state.chartList}
            handleRangeChange={this.handleChartChange}
            name="chart"
            range={chart}
          />
        </div>
        {chart === "" ? (
          <CandleStickChart {...this.state} {...this.props} />
        ) : (
          selectChart[chart]
        )}
      </>
    );
  }
}

export default ChartSelect;
