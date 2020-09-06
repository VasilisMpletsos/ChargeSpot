import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import classes from './NavBar.module.css';
import Switch from '@material-ui/core/Switch';
import {
 Link, NavLink
} from "react-router-dom";


const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
    <AppBar position="static" className={classes.NavBar}>
        <Toolbar className={classes.NavBar}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon fontSize="large" color='secondary' />
          </Button>
          <Menu className={classes.Dropdown} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
             <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
             <MenuItem onClick={handleClose}><Link to="/products">Products</Link></MenuItem>
             <MenuItem onClick={handleClose}><Link to="/contact">Contact</Link></MenuItem>
          </Menu>
          <Hidden xsDown={true}>
            <Typography variant="h6">
                Charge Spot
            </Typography>
          </Hidden>
          <div className={classes.Logsign}>
            <Switch onClick={props.darkMode}></Switch>
            <Button ><NavLink activeClassName={classes.active} to="/login">Login</NavLink></Button>
            <Button ><NavLink activeClassName={classes.active} to="/signup">Signup</NavLink></Button>
          </div>
        </Toolbar>
    </AppBar>
    )
}

export default NavBar;
    