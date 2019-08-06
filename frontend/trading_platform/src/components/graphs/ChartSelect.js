import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

// TODO: implement chart select feature

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginRight: theme.spacing.unit * 4,
    minWidth: 120
  }
});

class ChartSelect extends React.Component {
  render() {
    const { classes, cparameter } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="chart-select">Chart Type</InputLabel>
          <Select
            value={cparameter}
            inputProps={{
              name: "cparameter",
              id: "chart-select"
            }}
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            <MenuItem value={"candleStick"}>Candle Stick</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(ChartSelect);
