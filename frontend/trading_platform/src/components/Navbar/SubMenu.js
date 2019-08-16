import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

function SubMenu(props) {
  const {
    anchorEl,
    handleMenuClose,
    isMenuOpen,
    origin,
    logout,
  } = props;
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
        Profile
      </MenuItem>
      <span onClick={handleMenuClose}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </span>
    </Menu>
  );
}

export default SubMenu;
