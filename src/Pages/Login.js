import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PasswordKey from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    marginTop: '4%',
    width: '50%',
  },
  form:{
    paddingBottom: '4%',
  },
  input:{
    width: '100%',
    minWidth: 100,
  },
  send:{
    marginTop: '10%',
    width: '100%',
  },
  sendButton: {
    width: '20%',
    minWidth: 200,
  },
  space: {
    marginTop: '5%',
  }
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
  }

    myChangeHandler = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]:value});
    }

    render() {
      const { classes } = this.props;
      return (
        <Container>
        <h1>Login</h1>
        <Box className={classes.form} boxShadow={10}  display="flex" justifyContent="center" alignItems="center">
        <form className={classes.root}  id="signup"  autoComplete="off">
         <Box className={classes.space}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              required = {true}
              onChange={this.myChangeHandler}
              className={classes.input}
              name="email"
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            </Box>
            <Box className={classes.space}>
            <InputLabel htmlFor="password"> Password</InputLabel>
            <Input
              required = {true}
              onChange={this.myChangeHandler}
              className={classes.input}
              name="password"
              type="password"
              startAdornment={
                <InputAdornment position="start">
                  <PasswordKey />
                </InputAdornment>
              }
            />
            </Box>
            <Box display="flex" className={classes.send} alignItems="center" justifyContent="center">
            <Button type="submit" className={classes.sendButton} variant="contained" startIcon={<SendIcon />} color="primary">
              Sign Up
            </Button>
            </Box>
        </form>
        </Box>
        </Container>
      );
    }
  }

  export default withStyles(useStyles)(Login)
