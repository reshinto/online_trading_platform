import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from "@material-ui/icons/Timeline";
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  list: {
    width: 250
  }
});

class MainMenu extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Button disabled>
            <ListItem>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItem>
          </Button>
        </List>
        <Divider />
        <List>
          {["Dashboard", "Chart", "Company", "Financials"].map((text, i) => (
            <Button
              key={i}
              fullWidth
              component={Link}
              to={`/${text.toLowerCase()}`}
            >
              <ListItem>
                <ListItemIcon>
                  {i === 0 ? (
                    <DashboardIcon />
                  ) : i === 1 ? (
                    <TimelineIcon />
                  ) : i === 2 ? (
                    <DescriptionIcon />
                  ) : i === 3 ? (
                    <AccountBalanceIcon />
                  ) : (
                    <span />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Button>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Tooltip disableFocusListener disableTouchListener title="Menu">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            onClose={this.handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Drawer open={open} onClose={this.handleDrawerClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerClose}
            onKeyDown={this.handleDrawerClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
