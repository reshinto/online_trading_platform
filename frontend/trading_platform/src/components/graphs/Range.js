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
    minWidth: 145
  }
});

class Range extends React.Component {
  state = {
    defaultRange: ["", "max", "5y", "1y", "ytd", "6m", "3m", "1m", "intraday"]
  };

  render() {
    const { classes, range, handleRangeChange, list, name } = this.props;
    const { defaultRange } = this.state;
    const menu = list === undefined ? defaultRange : list;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={`date-${name}`}>{name}</InputLabel>
          <Select
            value={range}
            onChange={handleRangeChange}
            inputProps={{
              name: name
            }}
          >
            {menu.map((data, i) => (
              <MenuItem key={i} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Range);
