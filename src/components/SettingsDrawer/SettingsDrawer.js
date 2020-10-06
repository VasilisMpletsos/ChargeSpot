import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Switch, List, ListItem, ListItemText } from "@material-ui/core";
import { Divider, Button, ListSubheader, Box, TextField } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BackspaceIcon from "@material-ui/icons/Backspace";
import TimelineIcon from "@material-ui/icons/Timeline";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import BatteryCharging20Icon from "@material-ui/icons/BatteryCharging20";
import socketIOClient from "socket.io-client";
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actionTypes from "../../store/actions";
import classes from "./SettingsDrawer.module.css";

const StyledTextField = withStyles({
  root: {
    marginBottom: "20px",
    width: "100%",
  },
})(TextField);

const StyledTableCell = withStyles({
  root: {
    fontWeight: "bold",
    fontFamily: "Dancing Script",
    fontSize: "25px",
  },
})(TableCell);

const ENDPOINT = "https://ec2-35-176-175-106.eu-west-2.compute.amazonaws.com:5000";

const Settings = (props) => {
  const darkState = useSelector((state) => state.prefersDark);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const deauth = useCallback(() => dispatch({ type: actionTypes.DEAUTHENTICATE }), [dispatch]);

  const [state, changeState] = useState({
    cardnumber: "",
    ccname: "",
    expdate: "",
    cardcvc: "",
  });

  const inputHandler = (event) => {
    const initialState = { ...state };
    initialState[event.target.name] = event.target.value;
    changeState(initialState);
  };

  const [connectedUsers, setConnectedUsers] = useState("-");

  const [accountDialogState, setAccountState] = useState(false);

  const toggleAccountDialog = (state) => {
    setAccountState(state);
  };

  const [usageDialogState, setUsageState] = useState(false);

  const toggleUsageDialog = (state) => {
    setUsageState(state);
  };

  const [creditDialogState, setCreditState] = useState(false);

  const toggleCreditDialog = (state) => {
    setCreditState(state);
  };

  const logout = () => {
    props.close();
    deauth();
  };

  let show;
  if (auth) {
    show = (
      <List>
        <ListSubheader component='div' id='nested-list-subheader'>
          <Button onClick={props.close} startIcon={<BackspaceIcon />}></Button>
          Settings
        </ListSubheader>
        <Divider />
        <ListItem>
          <Switch onClick={props.darkMode} checked={darkState}></Switch>
          <ListItemText primary='Dark Mode' />
        </ListItem>
        <ListItem>
          <BatteryCharging20Icon />
          <ListItemText>{connectedUsers} people charging</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <Button startIcon={<TimelineIcon />} onClick={() => toggleUsageDialog(true)}>
            Usage History
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<AccountBalanceIcon />} onClick={() => toggleAccountDialog(true)}>
            Account Balance
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<CreditCardIcon />} onClick={() => toggleCreditDialog(true)}>
            Credit Card Settings
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<ExitToAppIcon />} onClick={() => logout()}>
            Logout
          </Button>
        </ListItem>
      </List>
    );
  } else {
    show = (
      <List>
        <ListSubheader component='div' id='nested-list-subheader'>
          <Button onClick={props.close} startIcon={<BackspaceIcon />}></Button>
          Settings
        </ListSubheader>
        <Divider />
        <ListItem>
          <Switch onClick={props.darkMode} checked={darkState}></Switch>
          <ListItemText primary='Dark Mode' />
        </ListItem>
        <ListItem>
          <BatteryCharging20Icon />
          <ListItemText>{connectedUsers} people charging</ListItemText>
        </ListItem>
        <Divider />
      </List>
    );
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", () => {
      console.log("check", socket.connected);
      socket.on("updateVisitors", (data) => {
        setConnectedUsers(data);
      });
    });
  }, []);

  const timeData = [
    {
      date: "10/08/2020",
      duration: 45,
      location: "Θεσσαλονίκη, Λιμάνι",
      price: 2.31,
    },
    {
      date: "03/08/2020",
      duration: 32,
      location: "Αθήνα, Κολωνάκι",
      price: 1.15,
    },
    {
      date: "04/02/2018",
      duration: 12,
      location: "Θεσσαλονίκη, Τούμπα",
      price: 0.46,
    },
  ];

  return (
    <div>
      <Drawer variant='persistent' anchor='right' open={props.open}>
        {show}
      </Drawer>

      {/* This is the Account Balance Popup Dialog, we can convert it to a component */}
      <Dialog onClose={() => toggleAccountDialog(false)} aria-labelledby='accountDialog' open={accountDialogState}>
        <DialogTitle id='accountDialog'>Account Balance</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.DialogContent} id='alert-dialog-description'>
            Here you can see your remaining money. Thanks for using our platform and helping the enviroment by charging with 100% renewable energy.
          </DialogContentText>
          <div className={classes.Money}>25.33 €</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleAccountDialog(false)} color='primary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* This is the History Usage Popup Dialog, we can convert it to a component */}
      <Dialog onClose={() => toggleUsageDialog(false)} open={usageDialogState}>
        <DialogTitle>Usage History</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.DialogContent} id='alert-dialog-description'>
            Here you can see the last 5 charging times you also used our Platform.
          </DialogContentText>
          <TableContainer component={Box}>
            <Table size='small' align>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Duration</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                </TableRow>
              </TableHead>
              {timeData.map((data) => (
                <TableBody>
                  <TableRow>
                    <TableCell>{data.date}</TableCell>
                    <TableCell>{data.duration} minutes</TableCell>
                    <TableCell>{data.location}</TableCell>
                    <TableCell>{data.price} €</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleUsageDialog(false)} color='primary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* This is the History Usage Popup Dialog, we can convert it to a component */}
      <Dialog onClose={() => toggleCreditDialog(false)} open={creditDialogState}>
        <DialogTitle>Credit Card Settings</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.DialogContent}>
            Here you can change settings regarding your payment method.No worries, no Credit Card info are saved online
          </DialogContentText>
          <form id='creditCardInfo'>
            <StyledTextField
              value={state.cardnumber}
              name='cardnumber'
              type='text'
              label='Card_Holder'
              required={true}
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.ccname.toUpperCase()}
              name='ccname'
              type='text'
              label='Card_Holder'
              required={true}
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.expdate}
              name='expdate'
              autoComplete='cc-exp'
              type='text'
              label='Expires'
              required={true}
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.cardcvc}
              required={true}
              name='cardcvc'
              autoComplete='cc-csc'
              label='CVC'
              type='text'
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary'>
            Save
          </Button>
          <Button onClick={() => toggleCreditDialog(false)} color='primary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
