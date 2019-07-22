import React from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions/iexAction";
import TextField from "@material-ui/core/TextField";
import LineChart from "./LineChart";

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

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
        {this.props.data.length !== 0 ? (
          <LineChart width={800} height={800} data={this.props.data} />
        ) : (
          ""
        )}
      </div>
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
)(SetChart);
