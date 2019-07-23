import React from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions/iexAction";
import TextField from "@material-ui/core/TextField";
import LineChart from "./LineChart";
import Surface from "./Surface";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class SetChart extends React.Component {
  state = {
    days: 50,
    keys: []
  };

  componentDidMount() {
    this.props.getData("histDay", "last", this.state.days);
  }

  cleanInput = () => this.setState({ days: "" });

  handleSubmit = e => {
    e.preventDefault();
    this.props.getData("histDay", "last", this.state.days);
  };

  onChange = prop => e => this.setState({ [prop]: e.target.value });

  render() {
    const { days } = this.state;
    const view = [800, 800]; // [width, height]
    const trbl = [10, 10, 30, 10]; // [top, right, bottom, left] margins

    return (
      <Paper elevation={1}>
        <form style={{marginLeft: "50px"}} onSubmit={this.handleSubmit}>
          <TextField
            name="days"
            value={days}
            type="text"
            placeholder="No. of days"
            onChange={this.onChange("days")}
            onClick={this.cleanInput}
            autoFocus
            margin="dense"
          />
        </form>
        <Surface view={view} trbl={trbl}>
          {this.props.data.length !== 0 ? (
            <LineChart width={800} height={800} data={this.props.data} />
          ) : (
            ""
          )}
        </Surface>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.iexReducer.data
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(withStyles(styles)(SetChart));
