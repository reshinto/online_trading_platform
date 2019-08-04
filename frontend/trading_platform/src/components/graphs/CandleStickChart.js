import React from "react";
import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { Label } from "react-stockcharts/lib/annotation";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginLeft: theme.spacing.unit * 4,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  }
});

class CandleStickChart extends React.Component {
  componentWillMount() {
    this.setState({
      suffix: 1
    });
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
      cparameter,
      classes,
      handleRangeChange,
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
    const title = this.props.parameter;
    let { width } = this.props;
    width = width - 50;

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

    // const margin = { left: 40, right: 20, top: 30, bottom: 50 };
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
      <Grid item xs={8}>
        <Paper style={{ width: width }} elevation={2}>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="date-range">Range</InputLabel>
              <Select
                value={cparameter}
                onChange={handleRangeChange}
                inputProps={{
                  name: "cparameter",
                  id: "date-range"
                }}
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                <MenuItem value={"max"}>Max</MenuItem>
                <MenuItem value={"5y"}>Five years</MenuItem>
                <MenuItem value={"1y"}>One year</MenuItem>
                <MenuItem value={"ytd"}>Year To Date</MenuItem>
                <MenuItem value={"6m"}>Six months</MenuItem>
                <MenuItem value={"3m"}>Three months</MenuItem>
                <MenuItem value={"1m"}>One month</MenuItem>
              </Select>
            </FormControl>
          </form>

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
              x={(width - margin.left - margin.right) / 2}
              y={-5}
              fontSize={30}
              text={title}
            />
            <Label
              x={(width - margin.left - margin.right) / 2}
              y={height - 50}
              fontSize={12}
              text="Date"
            />
            <Label
              x={-margin.left + 20}
              y={height / 2 - margin.top - margin.bottom}
              fontSize={12}
              text="Price"
              rotate={-90}
            />
            <Chart id={1} yExtents={d => [d.high, d.low]}>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                zoomEnabled={zoomEvent}
                {...xGrid}
              />
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                zoomEnabled={zoomEvent}
                {...yGrid}
              />
              <HoverTooltip
                tooltipContent={this.tooltipContent([])}
                fontSize={15}
              />
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
              <CandlestickSeries />
              <ZoomButtons onReset={this.handleReset} />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        </Paper>
      </Grid>
    );
  }
}

CandleStickChart = fitWidth(CandleStickChart);

export default withStyles(styles)(CandleStickChart);
