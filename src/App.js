import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import Contact from './pages/Contact.js';
import Login from './pages/Login.js';
import Sign from './pages/Sign.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuDrop: {
      marginTop: theme.spacing(6),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: 'none',
    },
    signLogin: {
      textDecoration: 'none',
      color: 'white',
      fontSize: 'normal',
    }
  }),
);

export default function MenuAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon fontSize="large" style={{color: '#00ff00'}} className={classes.menuButton} />
          </Button>
          <Menu id="simple-menu" className={classes.menuDrop} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}><Link className={classes.link} to="/">Home</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link className={classes.link} to="/products">Products</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link className={classes.link} to="/contact">Contact</Link></MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Charge Spot
          </Typography>
          <Button ><Link className={classes.signLogin} to="/login">Login</Link></Button>
          <Button ><Link className={classes.signLogin} to="/sign">Sign Up</Link></Button>
        </Toolbar>
      </AppBar>
      <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
