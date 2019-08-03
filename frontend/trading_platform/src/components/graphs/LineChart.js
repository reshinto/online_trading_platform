import React from "react";
import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Surface from "./Surface";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  svg: {
    fill: "#000",
    fillOpacity: 0.3
  },
  axis: {
    stroke: "#000"
  },
  axisLabels: {
    fill: "#000",
    fillOpacity: 0.9,
    fontSize: 12,
    textAnchor: "middle"
  },
  gridline: {
    opacity: 0.5,
    stroke: "#000"
  },
  titleLabel: {
    textAnchor: "middle",
    fontSize: "2.5em",
    fill: "black",
    fillOpacity: 1
  },
  text: {
    fontSize: "1em"
  },
  xLabel: {
    textAnchor: "middle",
    fill: "black",
    fillOpacity: 1,
    fontSize: "2em"
  },
  yLabel: {
    textAnchor: "middle",
    fill: "black",
    fillOpacity: 1,
    transform: "rotate(-90deg)",
    fontSize: "2em"
  },
  line: {
    stroke: "steelblue",
    strokeWidth: 2,
    fill: "none"
  },
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

class LineChart extends React.Component {
  render() {
    const {
      cparameter,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      width,
      height,
      trbl,
      classes,
      handleRangeChange
    } = this.props;
    const title = this.props.parameter;
    let { data } = this.props;
    const view = [width, height]; // [width, height]

    const parseDate = d3.timeParse("%Y-%m-%d");
    const xValue = d => parseDate(d.date);
    const yValue = d => d.open;
    const maxValue = d3.max(data, yValue);
    const minValue = d3.min(data, yValue);
    const scaleMax = maxValue + maxValue * 0.05;
    const scaleMin =
      minValue - minValue * 0.05 < 0 ? 0 : minValue - minValue * 0.05;
    const h = height - marginBottom;
    const w = width - marginLeft - marginRight;

    // x scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, xValue)) //domain: [min,max] of a
      .range([marginLeft, w]);

    // y scale
    const y = d3
      .scaleLinear()
      .domain([scaleMin, scaleMax]) // domain [0,max] of b (start from 0)
      .range([h, marginBottom]);

    // line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
    const line = d3
      .line()
      .x(d => x(parseDate(d.date)))
      .y(d => y(d.open))
      .curve(d3.curveMonotoneX); //curve line

    const formatTime = d3.timeFormat("%Y-%m-%d");
    const xTicks = x.ticks(6).map(d => (
      <g key={d} transform={`translate(0,${y(0)})`}>
        <text className={classes.text}>{formatTime(d)}</text>
        <line
          x1="0"
          x2="0"
          y1="0"
          y2="10"
          transform="translate(0, -30)"
          className={classes.axis}
        />
      </g>
    ));

    const yTicks = y.ticks(5).map((d, i) =>
      y(d) > 10 && y(d) < h ? (
        <g key={i} transform={`translate(${marginLeft},${y(d)})`}>
          <text x="-12" y="5" className={classes.text}>
            {d}
          </text>
          <line
            className={classes.gridline}
            x1="0"
            x2={w - marginRight - marginLeft}
            y1="0"
            y2="0"
            transform="translate(0,0)"
          />
        </g>
      ) : null
    );

    return (
      <Grid item xs={8}>
        <Paper elevation={1}>
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
          <Surface view={view} trbl={trbl}>
            <svg width={width} height={height} className={classes.svg}>
              {/* Title label */}
              <text x={width / 2} y={marginTop} className={classes.titleLabel}>
                {title}
              </text>
              {/* X axis line */}
              <line
                className={classes.axis}
                x1={marginLeft}
                x2={w}
                y1={h}
                y2={h}
              />
              {/* Y axis line */}
              <line
                className={classes.axis}
                x1={marginLeft}
                x2={marginLeft}
                y1={marginBottom}
                y2={h}
              />
              {/* data line */}
              <path d={line(data)} className={classes.line} />
              {/* X ticks at x axis line */}
              <g className={classes.axisLabels}>{xTicks}</g>
              <text x={width / 2} y={780} className={classes.xLabel}>
                Date
              </text>
              {/* y ticks at y axis line */}
              <g className={classes.axisLabels}>{yTicks}</g>
              <text x={-width / 2} y={30} className={classes.yLabel}>
                Price
              </text>
            </svg>
          </Surface>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(LineChart);
