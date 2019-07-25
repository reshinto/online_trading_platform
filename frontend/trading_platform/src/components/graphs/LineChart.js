import React from "react";
import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Surface from "./Surface";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class LineChart extends React.Component {
  state = {
    margin: 80,
    defaultData: [
      {
        price: 0
      }
    ]
  };

  render() {
    const axis = {
      stroke: "#000"
    };

    const axisLabels = {
      fill: "#000",
      fillOpacity: 0.9,
      fontSize: 12,
      textAnchor: "middle",
      stroke: "#000"
    };

    const gridline = {
      opacity: 0.2
    };

    const view = [800, 800]; // [width, height]
    const trbl = [10, 10, 30, 10]; // [top, right, bottom, left] margins
    const { margin } = this.state;
    let { width, height, data, title } = this.props;
    if (data !== undefined) {
      data = data.map((data, i) => {
        return { id: i, ...data };
      });
    } else {
      data = this.state.defaultData;
    }

    const h = height - margin,
      w = width - 2 * margin;

    //x scale
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.id)) //domain: [min,max] of a
      .range([margin, w]);

    //y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.open)]) // domain [0,max] of b (start from 0)
      .range([h, margin]);

    //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
    const line = d3
      .line()
      .x(d => x(d.id))
      .y(d => y(d.open))
      .curve(d3.curveCatmullRom.alpha(0.5)); //curve line

    const xTicks = x.ticks(6).map(d =>
      x(d) > margin && x(d) < w ? (
        <g transform={`translate(${x(d)},${h + margin - 50})`}>
          <text style={{ fontSize: "1em" }}>{d}</text>
          <line
            x1="0"
            x2="0"
            y1="0"
            y2="10"
            transform="translate(0, -30)"
            style={{ stroke: "#000" }}
          />
        </g>
      ) : null
    );

    const yTicks = y.ticks(5).map(d =>
      y(d) > 10 && y(d) < h ? (
        <g transform={`translate(${margin - 10},${y(d)})`}>
          <text x="-12" y="5" style={{ fontSize: "1em" }}>
            {d}
          </text>
          <line
            x1="0"
            x2="5"
            y1="0"
            y2="0"
            transform="translate(5,0)"
            style={{ stroke: "#000" }}
          />
          <line
            style={gridline}
            x1="10"
            x2={w - margin}
            y1="0"
            y2="0"
            transform="translate(-5,0)"
          />
        </g>
      ) : null
    );

    return (
      <Grid item xs={4}>
        <Paper elevation={1}>
          <Surface view={view} trbl={trbl}>
            <svg
              width={width}
              height={height}
              style={{
                fill: "#000",
                fillOpacity: 0.3
              }}
            >
              {/* Title label */}
              <text
                x={width / 2}
                y={30}
                style={{
                  textAnchor: "middle",
                  fontSize: "2.5em",
                  fill: "black",
                  fillOpacity: 1
                }}
              >
                {title} Line Chart
              </text>
              {/* X axis line */}
              <line style={axis} x1={margin} x2={w} y1={h} y2={h} />
              {/* Y axis line */}
              <line style={axis} x1={margin} x2={margin} y1={margin} y2={h} />
              {/* data line */}
              <path
                d={line(data)}
                style={{
                  stroke: "steelblue",
                  strokeWidth: 2,
                  fill: "none"
                }}
              />
              {/* X ticks at x axis line */}
              <g style={axisLabels}>{xTicks}</g>
              <text
                x={width / 2}
                y={780}
                style={{
                  textAnchor: "middle",
                  fill: "black",
                  fillOpacity: 1,
                  fontSize: "2em"
                }}
              >
                Suppose to be date
              </text>
              {/* y ticks at y axis line */}
              <g style={axisLabels}>{yTicks}</g>
              <text
                x={-width / 2}
                y={30}
                style={{
                  textAnchor: "middle",
                  fill: "black",
                  fillOpacity: 1,
                  transform: "rotate(-90deg)",
                  fontSize: "2em"
                }}
              >
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
