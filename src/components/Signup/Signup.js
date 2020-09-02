import React , { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import classes from './Signup.module.css';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const Signup = () => {

    const [state, changeState] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        birth: '',
    })

    const inputHandler = (event) => {
        const initialState = {...state};
        initialState[event.target.name] = event.target.value;
        changeState(initialState);
    }

    const sendHandler = () => {
        console.log(state);
    }

    return(
    <Box>
        <h1>Signup</h1>
        <Box boxShadow={7}>
            <Grid className={classes.Signup} container alignItems="center" direction="row">
                <Grid className={classes.SignupItem} item xs={12} sm={6} lg={4}><TextField name="username" onChange={(event)=>inputHandler(event)} label="Username" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} sm={6} lg={4}><TextField name="email" onChange={(event)=>inputHandler(event)} label="Email" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} sm={6} lg={4}><TextField name="password" onChange={(event)=>inputHandler(event)} type="password" label="Password" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} sm={6} lg={4}><TextField name="password2" onChange={(event)=>inputHandler(event)} type="password" label="Retype Password" variant="outlined" /></Grid>
                <Grid className={classes.SignupItem} item xs={12} sm={6} lg={4}> 
                <TextField
                    name="birth" 
                    onChange={(event)=>inputHandler(event)}
                    label="Date of Birth"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Grid>
            </Grid>
            <Box className={classes.Sendbutton}><Button onClick={sendHandler} variant="contained" color="primary" className={classes.button} startIcon={<SendIcon/>}>Send</Button></Box>
        </Box>
    </Box>
    )
}

export default Signup;