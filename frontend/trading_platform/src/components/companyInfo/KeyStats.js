import React from "react";
import { connect } from "react-redux";
import { getKeyStats } from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

class KeyStats extends React.Component {
  componentDidMount() {
    this.getKeyStats(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getKeyStats(multi);
      }
    }
  }

  getKeyStats = symbol => {
    this.props.getKeyStats(symbol[0].value);
  };

  render() {
    const { keyStats, classes } = this.props;
    const keyStatsArray = [];
    for (let [key, value] of Object.entries(keyStats)) {
      keyStatsArray.push({ key: key, value: value });
    }

    return (
      <React.Fragment>
        {keyStatsArray.length !== 0 ? (
          <Paper className={classes.root} style={{ height: this.props.height }}>
            <Typography className={classes.title} gutterBottom>
              <b>Key Stats</b>
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {keyStatsArray.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyStats: state.iexReducer.keyStats,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getKeyStats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(KeyStats));
