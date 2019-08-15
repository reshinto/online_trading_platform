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
    fundInputIsClicked: false,
    usernameInputIsClicked: false,
    emailInputIsClicked: false,
    passwordInputIsClicked: false,
  };

  componentDidMount() {
    this.props.getUserData();
  }

  handleOpen = prop => () => {
    this.setState({ [prop]: true });
  };

  handleClose = prop => () => {
    this.setState({ [prop]: false });
    this.props.getUserData();
  };

  render() {
    const { userData } = this.props;
    const {
      fundInputIsClicked,
      tradeHistIsClicked,
      fundsHistIsClicked,
      usernameInputIsClicked,
      emailInputIsClicked,
      passwordInputIsClicked,
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
                  <SetUsername
                    isClicked={usernameInputIsClicked}
                    handleOpen={this.handleOpen("usernameInputIsClicked")}
                    handleClose={this.handleClose("usernameInputIsClicked")}
                  />
                  <SetEmail
                    isClicked={emailInputIsClicked}
                    handleOpen={this.handleOpen("emailInputIsClicked")}
                    handleClose={this.handleClose("emailInputIsClicked")}
                  />
                  <SetFunds
                    isClicked={fundInputIsClicked}
                    handleOpen={this.handleOpen("fundInputIsClicked")}
                    handleClose={this.handleClose("fundInputIsClicked")}
                  />
                  <SetPassword
                    isClicked={passwordInputIsClicked}
                    handleOpen={this.handleOpen("passwordInputIsClicked")}
                    handleClose={this.handleClose("passwordInputIsClicked")}
                  />
                  <SetTradeHistory
                    isClicked={tradeHistIsClicked}
                    handleOpen={this.handleOpen("tradeHistIsClicked")}
                    handleClose={this.handleClose("tradeHistIsClicked")}
                  />
                  <SetFundsHistory
                    isClicked={fundsHistIsClicked}
                    handleOpen={this.handleOpen("fundsHistIsClicked")}
                    handleClose={this.handleClose("fundsHistIsClicked")}
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
