import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, AreaSeries } from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { Label } from "react-stockcharts/lib/annotation";

class AreaChart extends React.Component {
  render() {
    const { margin, data: initialData, width, height, ratio } = this.props;
    const parseDate = d3.timeParse("%Y-%m-%d");

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d =>
      parseDate(d.date)
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={"hybrid"}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Label
          x={width - margin.left - 20}
          y={height / 2 - margin.top - margin.bottom}
          fontSize={12}
          text="Price"
          rotate={90}
        />
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={d3.timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={d3.format(".2f")}
          />

          <AreaSeries yAccessor={d => d.close} />

          <SingleValueTooltip
            xLabel="Date"
            xAccessor={d => parseDate(d.date)}
            /* xLabel is optional, absence will not show the x value */ yLabel="C"
            yAccessor={d => d.close}
            xDisplayFormat={d3.timeFormat("%Y-%m-%d")}
            yDisplayFormat={d3.format(".2f")}
            /* valueStroke="green" - optional prop */
            /* labelStroke="#4682B4" - optional prop */
            origin={[-40, 0]}
          />
          <SingleValueTooltip
            yLabel="Volume"
            yAccessor={d => d.volume}
            origin={[-40, 20]}
          />
        </Chart>
        <Chart
          id={2}
          yExtents={d => d.volume}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={d3.format(".2s")}
          />

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={d3.format(".4s")}
          />

          <BarSeries
            yAccessor={d => d.volume}
            stroke
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
            opacity={0.4}
            widthRatio={1}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired
};

AreaChart = fitWidth(AreaChart);

export default AreaChart;
