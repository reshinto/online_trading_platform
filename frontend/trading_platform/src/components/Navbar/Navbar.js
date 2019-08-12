import React from "react";
import MainMenu from "./MainMenu";
import Tab from "./Tab";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, clearErrors } from "../../redux/actions/authAction";
import { getFunds, addFunds } from "../../redux/actions/fundsAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    openLogin: false,
    openSignup: false,
    initialFund: {
      transactionType: "INITIAL",
      amount: 0.0,
      totalFund: 0.0
    }
  };

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      if (this.props.funds === null) {
        this.props.getFunds();
      } else {
        if (this.props.funds.length === 0) {
          this.props.addFunds(this.state.initialFund);
        }
      }
    }
  }

  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
    this.props.clearErrors();
  };

  handleClickOpenSignup = () => {
    this.setState({ openSignup: true });
    this.props.clearErrors();
  };

  handleProfileMenuOpen = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
    this.closeDialog();
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
    this.closeDialog();
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
    this.closeDialog();
  };

  closeDialog = () => {
    this.setState({
      openLogin: false,
      openSignup: false
    });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { isAuthenticated, classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        disableAutoFocusItem={true}
      >
        <span>
          <MenuItem
            onClick={this.handleMenuClose}
            component={Link}
            to="/profile"
          >
            Profile
          </MenuItem>
          <span onClick={this.handleMenuClose}>
            <MenuItem onClick={this.props.logout}>Logout</MenuItem>
          </span>
        </span>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem
          onClick={this.handleMobileMenuClose}
          component={Link}
          to="/profile"
        >
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <div onClick={this.props.logout}>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: "#323232" }} position="static">
          <Toolbar>
            <MainMenu />
            <Tab />
            <SearchBar />
            <div className={classes.grow} />
            {isAuthenticated ? (
              <div>
                <div className={classes.sectionDesktop}>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div>
                <Button
                  color="inherit"
                  onClick={this.handleClickOpenSignup}
                >
                  Signup
                </Button>
                <Dialog
                  open={this.state.openSignup}
                  onClose={this.handleMenuClose}
                  aria-labelledby="form-dialog-title"
                >
                  <Signup />
                </Dialog>
                <Button
                  color="inherit"
                  onClick={this.handleClickOpenLogin}
                >
                  Login
                </Button>
                <Dialog
                  open={this.state.openLogin}
                  onClose={this.handleMenuClose}
                  aria-labelledby="form-dialog-title"
                >
                  <Login />
                </Dialog>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  logout,
  clearErrors,
  getFunds,
  addFunds
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Navbar))
);
