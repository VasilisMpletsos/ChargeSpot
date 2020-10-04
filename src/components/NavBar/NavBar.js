import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import classes from "./NavBar.module.css";
import SettingsIcon from "@material-ui/icons/Settings";
import Settings from "../SettingsDrawer/SettingsDrawer";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = (props) => {
  //Redux Store
  const auth = useSelector((state) => state.auth);
  const userName = useSelector((state) => state.userName);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Here we show the username if the user is authenticated,
  // or we show the Signup & Login options!

  // I have to implement this with redux in order to have global username,
  // authenticated and many more variables

  let show;
  if (auth) {
    show = <div className={[classes.showNav, classes.navName].join(" ")}>{userName.toUpperCase()}</div>;
  } else {
    show = (
      <div className={classes.showNav}>
        <Button>
          <NavLink activeClassName={classes.active} to='/login'>
            Login
          </NavLink>
        </Button>
        <Button>
          <NavLink activeClassName={classes.active} to='/signup'>
            Signup
          </NavLink>
        </Button>
      </div>
    );
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='static'
      style={{
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 67%, rgba(0,212,255,1) 100%)",
      }}
      className={classes.NavBar}
    >
      <Toolbar className={classes.NavBar}>
        <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
          <MenuIcon fontSize='large' color='secondary' />
        </Button>
        <Menu className={classes.Dropdown} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose} style={{ backgroundColor: "white" }}>
            <Link to='/'>Home</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} style={{ backgroundColor: "white" }}>
            <Link to='/products'>Products</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} style={{ backgroundColor: "white" }}>
            <Link to='/contact'>Contact</Link>
          </MenuItem>
        </Menu>
        <Hidden xsDown={true}>
          <Typography variant='h6'>Charge Spot</Typography>
        </Hidden>
        <div className={classes.Logsign}>
          {show}
          <Button>
            <SettingsIcon onClick={handleDrawerOpen}></SettingsIcon>
          </Button>
        </div>
      </Toolbar>
      <Settings open={open} close={handleDrawerClose} darkMode={props.darkMode} />
    </AppBar>
  );
};

export default NavBar;
