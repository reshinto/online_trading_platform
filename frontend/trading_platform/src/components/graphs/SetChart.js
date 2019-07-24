import React from "react";
import { connect } from "react-redux";
import { getData, getCloudData } from "../../redux/actions/iexAction";
import TextField from "@material-ui/core/TextField";
import LineChart from "./LineChart";
import Grid from "@material-ui/core/Grid";

class SetChart extends React.Component {
  state = {
    parameter: "SNAP",
    infix: "trades",
    option: "symbols",
    option2: null,
    parameter2: null,
    cinfixKey: "stock",
    csuffixKey: "chart",
    cparameter: "/max",
    cquery: null,
  };

  componentDidMount() {
    // this.props.getData(this.state.infix, this.state.option, null, null, this.state.parameter);
    // this.props.getData("histDay", null, null, null, this.state.days);
    this.props.getData(
      this.state.infix,
      this.state.option,
      this.state.option2,
      this.state.parameter2,
      this.state.parameter
    );
    this.props.getCloudData(
      this.state.cinfixKey,
      this.state.parameter,
      this.state.csuffixKey,
      this.state.cparameter,
      this.state.cquery
    );
  }

  cleanInput = () => this.setState({ parameter: "" });

  handleSubmit = e => {
    e.preventDefault();
    this.props.getData(
      this.state.infix,
      this.state.option,
      this.state.option2,
      this.state.parameter2,
      this.state.parameter
    );
    // this.props.getData("histDay", null, null, null, this.state.days);
    this.props.getCloudData(
      this.state.cinfixKey,
      this.state.parameter,
      this.state.csuffixKey,
      this.state.cparameter,
      this.state.cquery
    );
  };

  onChange = prop => e => {
    if (typeof this.state.parameter === "string")
      this.setState({ [prop]: e.target.value.toUpperCase() });
    if (typeof this.state.parameter === "number")
      this.setState({ [prop]: e.target.value });
  }

  render() {
    const { parameter } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={4}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="days"
              value={parameter}
              type="text"
              placeholder="Stock Symbol"
              onChange={this.onChange("parameter")}
              onClick={this.cleanInput}
              autoFocus
              margin="dense"
            />
          </form>
        </Grid>
        {this.props.data.length !== 0 ? (
          <Grid container spacing={24}>
            <LineChart
              width={800}
              height={800}
              data={this.props.cloudData}
            />
          </Grid>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.iexReducer)
  return {
    data: state.iexReducer.data,
    cloudData: state.iexReducer.cloudData
  };
};

export default connect(
  mapStateToProps,
  { getData, getCloudData }
)(SetChart);
