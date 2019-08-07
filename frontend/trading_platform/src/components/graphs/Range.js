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
  }
});

class Range extends React.Component {
  state = {
    defaultRange: ["", "max", "5y", "1y", "ytd", "6m", "3m", "1m"]
  }

  render() {
    const { classes, cparameter, handleRangeChange, menuList } = this.props;
    const {defaultRange} = this.state;
    const menu = menuList === undefined ? defaultRange : menuList;

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
            {menu.map((data, i) => (
              <MenuItem key={i} value={data}>{data}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Range);
