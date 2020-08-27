import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Button';
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
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from "react-router-dom";

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
    minWidth: 200,
  }
});

class Sign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      gender: '',
      birth:'',
      password2: '',
      email: '',
      showInfo: false,
      info: '',
      redirect: null,
      infoType: ''
    };
  }

  hideInfo(){
    setTimeout(()=>{
      this.setState({showInfo: false});
    },5000)
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value});
    }

  formSubmit = (event) => {
    event.preventDefault();
    if(this.state.password.length <= 7){
      this.setState({info: 'Passwrod Should be at least 7 Charachters Long!',showInfo: true,infoType: 'error'});
      this.hideInfo();
      return
    }else{
      if(this.state.password !== this.state.password2){
        this.setState({info: 'Passwrods Should Match!',showInfo: true,infoType: 'error'});
        this.hideInfo();
      }else{
        if(this.state.username.length <= 6){
          this.setState({info: 'Username Should be at least 6 Charachters Long!',showInfo: true,infoType: 'error'});
          this.hideInfo();
        }else{
          fetch('http://localhost:4444/add', {
            method: 'POST',
            body: JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              gender: this.state.gender,
              password: this.state.password,
              birth: this.state.birth,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((res)=>{
            console.log(res);
            if(res.status === 406){
              res.json().then((data)=>{
                this.setState({info: `${data.info}`});
                this.setState({showInfo: true});
              });
            }else{
              document.getElementById('signup').reset();
              this.setState({info: 'Account Created',showInfo: true,infoType: 'success'});
              this.hideInfo();
              //this.setState({ redirect: "/login" });
            }
          }).catch(()=>{
            this.setState({info: 'Server is currently unavaible!',showInfo: true,infoType: 'error'});
            this.hideInfo();
          })
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }else{
    return (
      <Container>
      <h1>Signup {this.state.username}</h1>
      <Box className={classes.form} boxShadow={10}  display="flex" justifyContent="center" alignItems="center" flexDirection="row">
      <form className={classes.root} onSubmit={this.formSubmit}  id="signup"  autoComplete="off">
        <Grid container direction="row" spacing={4}>
          <Grid item xs={12} sm={6} xl={4}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            required = {true}
            onChange = {this.myChangeHandler}
            className = {classes.input}
            name="username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
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
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
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
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
          <InputLabel htmlFor="password2">Retype Password</InputLabel>
          <Input
            required = {true}
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
          <Grid item xs={12} sm={6} xl={4}>
          <InputLabel htmlFor="birth">Age</InputLabel>
          <Input
            required = {true}
            onChange={this.myChangeHandler}
            name="birth"
            label="Birthday"
            type="date"
            className={classes.input}
          />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            required = {true}
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
          Signup
        </Button>
        </Box>
      </form>
      </Box>
      <Snackbar
        open={this.state.showInfo}
        anchorOrigin={{horizontal: 'right',vertical: 'bottom'}}
        >
        <Alert color={this.state.infoType} variant="filled" severity="error">
          {this.state.info}
        </Alert>
     </Snackbar>
      </Container>
    );
  }
  }
}
export default withStyles(useStyles)(Sign)
