import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

function SubMenu(props) {
  const { anchorEl, handleMenuClose, isMenuOpen, origin, logout } = props;
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={origin}
      transformOrigin={origin}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableAutoFocusItem={true}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <span onClick={handleMenuClose}>
        <MenuItem onClick={logout}>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </span>
    </Menu>
  );
}

export default SubMenu;
