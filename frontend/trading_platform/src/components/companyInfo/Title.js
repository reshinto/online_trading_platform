import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { getQuote } from "../../redux/actions/iexAction";

class Chart extends React.Component {
  componentDidMount() {
    this.getQuote(this.props.multi);
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi, quote } = this.props;
    if (multi !== null) {
      setTimeout(() => {
        if (quote !== prevProps.quote) this.props.getQuote(multi[0].value);
      }, 3000);
    }
  }

  getQuote(symbol) {
    this.props.getQuote(symbol[0].value);
  }

  render() {
    const { multi, quote } = this.props;
    const isPositive = Math.sign(quote.changePercent);
    return (
      <div style={{ paddingLeft: 10, paddingTop: 10 }}>
        <React.Fragment>
          <Grid container spacing={8}>
            <Grid item>
              <Typography component="div" variant="h5">
                {multi[0].name}
              </Typography>
            </Grid>
          </Grid>
          {Object.keys(quote).length !== 0 ? (
            <Grid container spacing={40}>
              <Grid item>
                <Typography component="div" variant="body1">
                  <span>
                    Latest Price:{" "}
                    <span style={{ color: "green" }}>
                      {quote.latestPrice.toFixed(2)}
                    </span>
                  </span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" variant="body1">
                  <span>
                    Change:{" "}
                    <span
                      style={
                        isPositive === 1 ? { color: "green" } : { color: "red" }
                      }
                    >
                      {quote.change}
                    </span>{" "}
                    (
                    <span
                      style={
                        isPositive === 1 ? { color: "green" } : { color: "red" }
                      }
                    >
                      {(quote.changePercent * 100).toFixed(2)}%
                    </span>
                    )
                  </span>
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <div>loading...</div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi,
    quote: state.iexReducer.quote
  };
};

const mapDispatchToProps = {
  getQuote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
