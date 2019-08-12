import React from "react";
import { connect } from "react-redux";
import { getAdvStats } from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    overflowY: "auto"
  },
  title: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    fontSize: 24
  }
});

class AdvancedStats extends React.Component {
  componentDidMount() {
    this.getAdvStats(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getAdvStats(multi);
      }
    }
  }

  getAdvStats = symbol => {
    if (symbol[0] !== undefined) this.props.getAdvStats(symbol[0].value);
  };

  render() {
    const { advStats, classes } = this.props;
    const advStatsArray = [];
    for (let [key, value] of Object.entries(advStats)) {
      advStatsArray.push({ key: key, value: value });
    }

    return (
      <React.Fragment>
        {advStatsArray.length !== 0 ? (
          <div className={classes.root} style={{ height: this.props.height }}>
            <Typography className={classes.title} gutterBottom>
              <b>Advanced Stats</b>
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {advStatsArray.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    advStats: state.iexReducer.advStats,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getAdvStats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdvancedStats));
