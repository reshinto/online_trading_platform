import React from "react";
import { connect } from "react-redux";
import { getData } from "../redux/actions/iexAction";
import TextField from "@material-ui/core/TextField";

class Dashboard extends React.Component {
  state = {
    days: ""
  };

  cleanInput = () => this.setState({days: ""});

  handleSubmit = e => {
    e.preventDefault();
    this.props.getData("histDay", "last", this.state.days);
    // this.cleanInput();
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
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Volume</th>
              <th>Routed Volume</th>
              <th>Market Share</th>
              <th>Is Half Day</th>
              <th>Lit Volume</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.date}</td>
                <td>{data.volume}</td>
                <td>{data.routedVolume}</td>
                <td>{data.marketShare}</td>
                <td>{data.isHalfday}</td>
                <td>{data.litVolume}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
)(Dashboard);
