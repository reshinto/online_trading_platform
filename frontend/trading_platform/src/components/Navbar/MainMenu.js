import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
});

class MainMenu extends React.Component {
  render(){
    const { classes } = this.props;
    return (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
    );
  }
}

export default (withStyles(styles)(MainMenu));
