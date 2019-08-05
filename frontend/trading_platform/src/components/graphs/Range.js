import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginLeft: theme.spacing.unit * 4,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  }
});

class Range extends React.Component {
  render() {
    const { classes, cparameter, handleRangeChange } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="date-range">Range</InputLabel>
          <Select
            value={cparameter}
            onChange={handleRangeChange}
            inputProps={{
              name: "cparameter",
              id: "date-range"
            }}
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            <MenuItem value={"max"}>Max</MenuItem>
            <MenuItem value={"5y"}>Five years</MenuItem>
            <MenuItem value={"1y"}>One year</MenuItem>
            <MenuItem value={"ytd"}>Year To Date</MenuItem>
            <MenuItem value={"6m"}>Six months</MenuItem>
            <MenuItem value={"3m"}>Three months</MenuItem>
            <MenuItem value={"1m"}>One month</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Range);
