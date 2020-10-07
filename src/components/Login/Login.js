import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import classes from "./Login.module.css";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import validator from "validator";
import Paper from "@material-ui/core/Paper";
import axios from "../../AxiosBase";
import { useHistory } from "react-router-dom";
import * as actionTypes from "../../store/actions";

const Login = () => {
  // History for redirect
  const history = useHistory();

  //Redux Variable and Function
  const dispatch = useDispatch();
  const clientAuth = useCallback(() => dispatch({ type: actionTypes.AUTHENTICATE }), [dispatch]);
  const setUserName = useCallback((name) => dispatch({ type: actionTypes.setUserName, name: name }), [dispatch]);
  const setAccountBalance = useCallback((account) => dispatch({ type: actionTypes.setAccountBalance, account: account }), [dispatch]);
  const setLastCharges = useCallback((lastCharges) => dispatch({ type: actionTypes.setLastCharges, lastCharges: lastCharges }), [dispatch]);

  const [state, changeState] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (event) => {
    const initialState = { ...state };
    initialState[event.target.name] = event.target.value;
    changeState(initialState);
  };

  const sendHandler = (event) => {
    event.preventDefault();
    let error = false;
    let message = "";

    if (!validator.isLength(state.username, { min: 6, max: 12 })) {
      error = true;
      message = "Username must have at least 6 letters and no more than 12!";
      setErrors({ errorName: true });
    } else if (!validator.isLength(state.password, { min: 6, max: 25 })) {
      error = true;
      message = "You Password must be between 6 and 25 charachters!";
      setErrors({ errorPassword: true });
    }

    if (error) {
      showMessage(message, "error");
    } else {
      axios
        .post("/login", state)
        .then((response) => {
          console.log(response.data);
          message = "Login Sent!";
          showMessage(message, "success");
          document.getElementById("loginForm").reset();
          if (response.data.auth) {
            clientAuth();
            setUserName(state.username);
            setAccountBalance(response.data.account);
            setLastCharges(response.data.lastCharges);
            history.push("/products");
          }
        })
        .catch((error) => {
          message = "Server Unavaible";
          showMessage(message, "error");
        });
    }
  };

  const [showInfo, setShowInfo] = React.useState({
    show: false,
    message: "",
    type: "error",
  });

  const showMessage = (message, typeError) => {
    setShowInfo({
      show: true,
      message: message,
      type: typeError,
    });
  };

  const closeHandler = () => {
    setShowInfo({
      show: false,
      message: "",
      type: "error",
    });
  };

  const [errors, setErrors] = React.useState({
    errorName: false,
    errorPassword: false,
  });

  return (
    <Paper>
      <Box className={classes.MainBox} boxShadow={7}>
        <h1 className={classes.Title}>Login</h1>
        <form id='loginForm' onSubmit={sendHandler} className={classes.Login}>
          <Grid className={classes.Login} container alignItems='center' justify='center' direction='row' spacing={4}>
            <Grid item container justify='center' xs={12}>
              <TextField
                className={classes.Input}
                error={errors.errorName}
                name='username'
                onChange={inputHandler}
                label='Username'
                variant='outlined'
              />
            </Grid>
            <Grid item container justify='center' xs={12}>
              <TextField
                color='primary'
                className={classes.Input}
                error={errors.errorPassword}
                name='password'
                onChange={inputHandler}
                type='password'
                label='Password'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Box className={classes.SendBox}>
            <Button
              className={classes.Sendbutton}
              type='submit'
              disabled={state.username.length === 0 || state.password.length === 0}
              variant='contained'
              color='primary'
              startIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </form>
        <Snackbar open={showInfo.show} autoHideDuration={10000} onClose={closeHandler} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert severity={showInfo.type} variant='filled'>
            {showInfo.message}
          </Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
};

export default Login;
