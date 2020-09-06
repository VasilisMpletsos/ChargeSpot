import React , { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import classes from './Signup.module.css';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/core/styles';

const Signup = () => {

    const theme = useTheme();

    const [showInfo, setShowInfo] = React.useState({
        show: false,
        message: '',
        type: 'error'
    });

    const [errors, setErrors] = React.useState({
        errorName: false,
        errorPassword: false,
        errorEmail: false,
        errorMatch: false,
        errorDate: false,
        errorGender: false
    });

    const [state, changeState] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        birth: '',
        checkedTerms: false,
        checkedNotifications: false,
    })

      const handleCheck = (event) => {
          console.log(event.target.name, event.target.checked)
        changeState({ ...state, [event.target.name]: event.target.checked });
      };

    const inputHandler = (event) => {
        const initialState = {...state};
        initialState[event.target.name] = event.target.value;
        changeState(initialState);
    }

    const showMessage = (message,typeError) => {
        setShowInfo({
            show: true,
            message: message,
            type: typeError,
        });
    }

    const closeHandler = () => {
        setShowInfo({
            show: false,
            message: '',
            type: 'error',
        });
    }

    const [gender, setGender] = React.useState('');

    const handleGender = (event) => {
        console.log(gender);
        setGender(event.target.value);
    };

    const sendHandler = (event) => {
        event.preventDefault();
        let error = false;
        let message = '';

        if(!validator.isLength(state.username,{min:6, max: 12})){
            error = true;
            message = 'Username must have at least 6 letters and no more than 12!';
            setErrors({errorName: true});
        }else if(!validator.isEmail(state.email)){
            error = true;
            message = 'You must provide a valid email!';
            setErrors({errorEmail: true});
        }else if(!validator.isLength(state.password,{min:6, max: 12})){
            error = true;
            message = 'You Password must be between 6 and 12 charachters!';
            setErrors({errorPassword: true});
        }else if(state.password !== state.password2){
            error = true;
            message = 'Passwords should match!';
            setErrors({errorMatch: true});
        }else if(!validator.isDate(state.birth)){
            error = true;
            message = 'You must provide a valid date!';
            setErrors({errorDate: true});
        }else if(gender === ''){
            error = true;
            message = 'You must determine gender!';
            setErrors({errorGender: true});
        }

        if(error){
            showMessage(message,'error');
        }else{
            message = 'Request for signup sent!';
            showMessage(message,'success');
            console.log(state);
        }

    }

    return(
    <Box>
        <Box className={classes.MainBox} boxShadow={7}> 
            <h1 className={classes.Title}>SignUp</h1>
            <form onSubmit={sendHandler}>
            <Grid className={classes.Signup} container alignItems="center" direction="row">
                <Grid className={classes.SignupItem} item xs={12} md={6}><TextField className={classes.Input} name="username" error={errors.errorName} onChange={(event)=>inputHandler(event)} label="Username" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} md={6}><TextField className={classes.Input} name="email" error={errors.errorEmail} onChange={(event)=>inputHandler(event)} label="Email" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} md={6}><TextField className={classes.Input} name="password" error={errors.errorPassword || errors.errorMatch} onChange={(event)=>inputHandler(event)} type="password" label="Password" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} md={6}><TextField className={classes.Input} name="password2" error={errors.errorMatch} onChange={(event)=>inputHandler(event)} type="password" label="Retype Password" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} md={6}> 
                <TextField
                    error={errors.errorDate}
                    name="birth" 
                    onChange={(event)=>inputHandler(event)}
                    label="Date of Birth"
                    type="date"
                    className={classes.Input}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </Grid>
                <Grid className={classes.SignupItem} item xs={12} md={6}> 
                <FormControl className={classes.Input}>
                <InputLabel id="gender">Gender</InputLabel>
                        <Select
                        labelId="gender"
                        id="gender"
                        error={errors.errorGender}
                        style={{width: '100%'}}
                        value={gender}
                        onChange={handleGender} label="Gender"
                        >
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                        <MenuItem value={3}>No Labels</MenuItem>
                        </Select>
                        </FormControl>
                </Grid>
            </Grid>
            <Grid style={{paddingBottom: '2%'}} container direction='column' alignItems='center'>
                <Grid><Switch name="checkedTerms" checked={state.checkedA} onChange={handleCheck} style={{display: 'inline'}} color="primary"/><Typography style={{display: 'inline'}}>Agree in terms of use</Typography></Grid>
                <Grid><Switch name="checkedNotifications" checked={state.checkedB} onChange={handleCheck} style={{display: 'inline'}} color="primary"/><Typography style={{display: 'inline'}}>Accept Email Notifications</Typography></Grid>
            </Grid>
            <Box className={classes.Sendbutton}>
                <Button type="submit" disabled={!state.checkedTerms} variant="contained" color='primary' className={classes.button} startIcon={<SendIcon/>}>Send</Button>
            </Box>
            </form>
            <Snackbar open={showInfo.show} autoHideDuration={10000} onClose={closeHandler} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                <Alert severity={showInfo.type} variant="filled">
                    {showInfo.message}
                </Alert>
            </Snackbar>
        </Box>
    </Box>
    )
}

export default Signup;