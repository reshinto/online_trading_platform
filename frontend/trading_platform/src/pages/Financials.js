import React from "react";
import FinancialStatements from "../components/companyInfo/FinancialStatements";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Title from "../components/companyInfo/Title";

class Financials extends React.Component {
  default = this.props.multi;

  render() {
    return (
      <div>
        {this.props.multi !== null ? (
          <Paper
            elevation={0}
            style={{
              height: "95vh",
              overflowY: "scroll",
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <Title />
            <div>
              <FinancialStatements />
            </div>
          </Paper>
        ) : (
          <br />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi
  };
};

export default connect(
  mapStateToProps,
  null
)(Financials);
