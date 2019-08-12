import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/userAction";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SetUsername from "../components/profile/SetUsername";
import SetEmail from "../components/profile/SetEmail";
import SetFunds from "../components/profile/SetFunds";
import SetPassword from "../components/profile/SetPassword";
import SetTradeHistory from "../components/profile/SetTradeHistory";
import SetFundsHistory from "../components/profile/SetFundsHistory";
import Title from "../components/companyInfo/Title";

class Profile extends React.Component {
  state = {
    tradeHistIsClicked: false,
    fundsHistIsClicked: false,
    fundInputIsClicked: false
  };

  componentDidMount() {
    this.props.getUserData();
  }

  handleFundInputOpen = () => {
    this.setState({ fundInputIsClicked: true });
  };

  handleFundInputClose = () => {
    this.setState({ fundInputIsClicked: false });
  };

  handleTradeHistoryOpen = () => {
    this.setState({ tradeHistIsClicked: true });
  };

  handleTradeHistoryClose = () => {
    this.setState({ tradeHistIsClicked: false });
  };

  handleFundsHistoryOpen = () => {
    this.setState({ fundsHistIsClicked: true });
  };

  handleFundsHistoryClose = () => {
    this.setState({ fundsHistIsClicked: false });
  };

  render() {
    const { userData } = this.props;
    const {
      fundInputIsClicked,
      tradeHistIsClicked,
      fundsHistIsClicked
    } = this.state;
    return (
      <div>
        {this.props.multi !== null ? <Title /> : <br />}
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center"
          }}
        >
          <Grid item>
            <Paper style={{ paddingLeft: 10, paddingRight: 10 }} elevation={2}>
              <h1 style={{ textAlign: "center" }}>
                Welcome {userData.username}
              </h1>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>
                      <Typography variant="h5">Profile</Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <SetUsername />
                  <SetEmail />
                  <SetFunds
                    handleFundInputOpen={this.handleFundInputOpen}
                    handleFundInputClose={this.handleFundInputClose}
                    fundInputIsClicked={fundInputIsClicked}
                  />
                  <SetPassword />
                  <SetTradeHistory
                    tradeHistIsClicked={tradeHistIsClicked}
                    handleTradeHistoryOpen={this.handleTradeHistoryOpen}
                    handleTradeHistoryClose={this.handleTradeHistoryClose}
                  />
                  <SetFundsHistory
                    fundsHistIsClicked={fundsHistIsClicked}
                    handleFundsHistoryOpen={this.handleFundsHistoryOpen}
                    handleFundsHistoryClose={this.handleFundsHistoryClose}
                  />
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
