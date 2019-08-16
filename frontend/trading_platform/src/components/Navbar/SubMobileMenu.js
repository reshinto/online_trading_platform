import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

function SubMobileMenu(props) {
  const {
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    origin,
    handleMenuClose,
    logout
  } = props;

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={origin}
      transformOrigin={origin}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <div onClick={logout}>
        <MenuItem onClick={handleMenuClose}>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </div>
    </Menu>
  );
}
export default SubMobileMenu;
