import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FundInput from "./FundInput";
import { currencyFormat } from "../../redux/utility";

function SetFunds(props) {
  const { funds, handleOpen, handleClose, isClicked } = props;

  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Funds</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Typography variant="body1">
          $
          {funds[funds.length - 1].totalFund === null ||
          funds[funds.length - 1].totalFund === undefined
            ? 0
            : currencyFormat(funds[funds.length - 1].totalFund)}{" "}
        </Typography>
      </td>
      <td>
        <Button color="primary" onClick={handleOpen}>
          DEPOSIT
        </Button>
        <FundInput handleClose={handleClose} isClicked={isClicked} />
      </td>
    </tr>
  );
}

const mapStateToProps = state => {
  return {
    funds: state.fundsReducer.funds
  };
};

export default connect(mapStateToProps)(SetFunds);
