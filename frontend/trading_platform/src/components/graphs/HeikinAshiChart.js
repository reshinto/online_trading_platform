import React from "react";
import * as d3 from "d3";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { Label } from "react-stockcharts/lib/annotation";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  HoverTooltip
} from "react-stockcharts/lib/tooltip";
import { ema, heikinAshi, sma } from "react-stockcharts/lib/indicator";
import { currencyFormat } from "../../redux/utility";

class HeikinAshiChart extends React.Component {
  state = {
    suffix: 1
  }

  saveNode = node => {
    this.node = node;
  };

  resetYDomain = () => {
    this.node.resetYDomain();
  };

  handleReset = () => {
    this.setState({
      suffix: this.state.suffix + 1
    });
  };

  tooltipContent = ys => {
    const dateFormat = d3.timeFormat("%Y-%m-%d");
    const numberFormat = d3.format(".2f");
    return ({ currentItem, xAccessor }) => {
      return {
        x: dateFormat(xAccessor(currentItem)),
        y: [
          {
            label: "open",
            value: currentItem.open && numberFormat(currentItem.open)
          },
          {
            label: "high",
            value: currentItem.high && numberFormat(currentItem.high)
          },
          {
            label: "low",
            value: currentItem.low && numberFormat(currentItem.low)
          },
          {
            label: "close",
            value: currentItem.close && numberFormat(currentItem.close)
          },
          {
            label: "volume",
            value: currentItem.volume && currencyFormat(currentItem.volume, 0)
          }
        ]
          .concat(
            ys.map(each => ({
              label: each.label,
              value: each.value(currentItem),
              stroke: each.stroke
            }))
          )
          .filter(line => line.value)
      };
    };
  };

  render() {
    const {
      width,
      height,
      data: initialData,
      ratio,
      mouseMoveEvent,
      panEvent,
      zoomEvent,
      zoomAnchor,
      clamp,
      margin
    } = this.props;
    const ha = heikinAshi();
    const ema20 = ema()
      .id(0)
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.ema20 = c;
      })
      .accessor(d => d.ema20);

    const ema50 = ema()
      .id(2)
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor(d => d.ema50);

    const smaVolume50 = sma()
      .id(3)
      .options({ windowSize: 50, sourcePath: "volume" })
      .merge((d, c) => {
        d.smaVolume50 = c;
      })
      .accessor(d => d.smaVolume50);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const calculatedData = smaVolume50(ema50(ema20(ha(initialData))));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d =>
      parseDate(d.date)
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
      : {};
    const xGrid = showGrid
      ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 }
      : {};

    return (
      <ChartCanvas
        ref={this.saveNode}
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        type={"hybrid"}
        mouseMoveEvent={mouseMoveEvent}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        zoomAnchor={zoomAnchor}
        seriesName={`MSFT_${this.state.suffix}`}
        data={data}
        xScale={xScale}
        xExtents={xExtents}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
      >
        <Label
          x={width - margin.left - 20}
          y={height / 2 - margin.top - margin.bottom}
          fontSize={12}
          text="Price"
          rotate={90}
        />
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            zoomEnabled={zoomEvent}
            {...xGrid}
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            zoomEnabled={zoomEvent}
            {...yGrid}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={d3.format(".1f")}
          />
          <HoverTooltip
            tooltipContent={this.tooltipContent([])}
            fontSize={15}
          />

          <CandlestickSeries />
          <ZoomButtons onReset={this.handleReset} />
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
          <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />

          <CurrentCoordinate
            yAccessor={ema20.accessor()}
            fill={ema20.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema50.accessor()}
            fill={ema50.stroke()}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={ema20.accessor()}
            fill={ema20.fill()}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={ema50.accessor()}
            fill={ema50.fill()}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={ema20.accessor()}
            fill={ema20.fill()}
          />
          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={ema50.accessor()}
            fill={ema50.fill()}
          />
          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: ema20.accessor(),
                type: "EMA",
                stroke: ema20.stroke(),
                windowSize: ema20.options().windowSize
              },
              {
                yAccessor: ema50.accessor(),
                type: "EMA",
                stroke: ema50.stroke(),
                windowSize: ema50.options().windowSize
              }
            ]}
          />
        </Chart>
        <Chart
          id={2}
          yExtents={[d => d.volume, smaVolume50.accessor()]}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={d3.format(".2s")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={d3.timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={d3.format(".4s")}
          />

          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
          <AreaSeries
            yAccessor={smaVolume50.accessor()}
            stroke={smaVolume50.stroke()}
            fill={smaVolume50.fill()}
          />

          <CurrentCoordinate
            yAccessor={smaVolume50.accessor()}
            fill={smaVolume50.stroke()}
          />
          <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={d => d.volume}
            displayFormat={d3.format(".4s")}
            fill="#0F0F0F"
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.volume}
            displayFormat={d3.format(".4s")}
            fill="#0F0F0F"
          />
          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={smaVolume50.accessor()}
            displayFormat={d3.format(".4s")}
            fill={smaVolume50.fill()}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={smaVolume50.accessor()}
            displayFormat={d3.format(".4s")}
            fill={smaVolume50.fill()}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

HeikinAshiChart = fitWidth(HeikinAshiChart);

export default HeikinAshiChart;
