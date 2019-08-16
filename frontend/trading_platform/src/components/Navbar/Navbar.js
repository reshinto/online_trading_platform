import React from "react";
import MainMenu from "./MainMenu";
import Tab from "./Tab";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { logout, clearErrors } from "../../redux/actions/authAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import SubMenu from "./SubMenu";
import SubMobileMenu from "./SubMobileMenu";
import SubMenuSection from "./SubMenuSection";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  navBarRoot: {
    width: "100%",
    flexnavBarGrow: 1
  },
  navBarGrow: {
    flexnavBarGrow: 1
  },
  navBarAppBarBgColor: {
    backgroundColor: "#323232"
  },
  navBarSectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  navBarSectionMobile: {
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

  handleOpen = prop => () => {
    this.setState({ [prop]: true });
    this.props.clearErrors();
  };

  handleMenuOpen = prop => e => {
    this.setState({ [prop]: e.currentTarget });
    this.closeDialog();
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null, mobileMoreAnchorEl: null });
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
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const origin = { vertical: "top", horizontal: "right" };

    return (
      <div className={classes.navBarRoot}>
        <AppBar className={classes.navBarAppBarBgColor} position="static">
          <Toolbar>
            <MainMenu />
            <Tab />
            <SearchBar />
            <div className={classes.navBarGrow} />
            <SubMenuSection
              isMenuOpen={isMenuOpen}
              handleMenuOpen={this.handleMenuOpen}
              handleMenuClose={this.handleMenuClose}
              handleOpen={this.handleOpen}
              {...this.props}
              {...this.state}
            />
          </Toolbar>
        </AppBar>
        <SubMenu
          handleMenuClose={this.handleMenuClose}
          isMenuOpen={isMenuOpen}
          origin={origin}
          {...this.props}
          {...this.state}
        />
        <SubMobileMenu
          handleMenuClose={this.handleMenuClose}
          isMobileMenuOpen={isMobileMenuOpen}
          origin={origin}
          {...this.props}
          {...this.state}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout,
  clearErrors
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Navbar))
);
