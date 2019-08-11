import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/userAction";
import { getFunds, addFunds } from "../redux/actions/fundsAction";
import Button from "@material-ui/core/Button";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUserData();
  }

  onClick = () => {
    const { funds } = this.props;
    const oldFund = funds[funds.length - 1].totalFund;
    const transactionType = "TOPUP";
    const amount = 200;
    const totalFund = oldFund + amount;
    const fund = {
      transactionType,
      amount,
      totalFund
    };
    this.props.addFunds(fund);
  };

  render() {
    const { userData } = this.props;
    let { funds } = this.props;
    return (
      <div>
        <div>Welcome {userData.username}</div>
        Funds:{" "}
        {funds[funds.length - 1].totalFund === null
          ? 0
          : funds[funds.length - 1].totalFund}
        <Button onClick={this.onClick}>TOP UP</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  getUserData,
  getFunds,
  addFunds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
