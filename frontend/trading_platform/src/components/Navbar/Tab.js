import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

class Tab extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Typography>
    );
  }
}

export default withStyles(styles)(Tab);
