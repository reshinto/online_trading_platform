import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function SetPassword(props) {
  return (
    <tr>
      <td>
        <Typography variant="subtitle1">Password</Typography>
      </td>
      <td>
        <Typography variant="body1">:</Typography>
      </td>
      <td>
        <Button color="primary">CHANGE PASSWORD</Button>
      </td>
    </tr>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPassword);
