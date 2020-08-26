import React from 'react';
import TextField from '@material-ui/core/TextField';
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
import { shadows } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = (theme) => ({
  root: {
    marginTop: '4%',
    width: '90%',
  },
  form:{
    paddingBottom: '4%',
  },
  input:{
    width: '95%',
    minWidth: 100,
  },
  send:{
    marginTop: '5%',
    width: '100%',
  },
  sendButton: {
    width: '20%',
  }
});

class Sign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      gender: '',
      age:'',
      password2: '',
      email: ''
    };
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value});
    }

  formSubmit = (event) => {
    event.preventDefault();
    if(this.state.password!=this.state.password2){
      alert('Wrong! Passwords Should Match');
    }else{
      alert('Passwords Match');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
      <h1>Sign Up {this.state.username}</h1>
      <Box className={classes.form} boxShadow={10}  display="flex" justifyContent="center" alignItems="center" flexDirection="row">
      <form className={classes.root} onSubmit={this.formSubmit}  id="signup"  autoComplete="off">
        <Grid container direction="row" spacing={8}>
          <Grid item xs>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            onChange={this.myChangeHandler}
            className={classes.input}
            name="username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          </Grid>
          <Grid item xs>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            onChange={this.myChangeHandler}
            className={classes.input}
            name="email"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
          </Grid>

          </Grid>
          <Grid container direction="row" spacing={8}>
          <Grid item xs>
          <InputLabel htmlFor="password"> Password</InputLabel>
          <Input
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
          </Grid>
          <Grid item xs>
          <InputLabel htmlFor="password2">Retype Password</InputLabel>
          <Input
            onChange={this.myChangeHandler}
            className={classes.input}
            name="password2"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <PasswordKey />
              </InputAdornment>
            }
          />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={8}>
          <Grid item xs>
          <InputLabel htmlFor="age">Age</InputLabel>
          <Input
            onChange={this.myChangeHandler}
            name="age"
            label="Birthday"
            type="date"
            defaultValue="2000-01-01"
            className={classes.input}
          />
          </Grid>
          <Grid item xs>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            onChange={this.myChangeHandler}
            className={classes.input}
            placeholder="Select Gender"
            name="gender"
            startAdornment={
              <InputAdornment position="start">
                <FaceIcon />
                </InputAdornment>
              }
              value={this.state.gender}
              >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>Nothing</MenuItem>
              </Select>
          </Grid>
        </Grid>
        <Box display="flex" className={classes.send} alignItems="center" justifyContent="center">
        <Button type="submit" className={classes.sendButton} variant="contained" startIcon={<SendIcon />} color="primary">
          Send
        </Button>
        </Box>
      </form>
      </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Sign)
