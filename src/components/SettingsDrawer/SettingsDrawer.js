import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Button from "@material-ui/core/Button";
import TimelineIcon from "@material-ui/icons/Timeline";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import BatteryCharging20Icon from "@material-ui/icons/BatteryCharging20";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import classes from "./SettingsDrawer.module.css";

const StyledTextField = withStyles({
  root: {
    marginBottom: "10px",
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

  const [state, changeState] = useState({
    creditCard: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const inputHandler = (event) => {
    console.log(state);
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
      duration: "0:45",
      location: "Thessaloniki, Port",
    },
    {
      date: "03/08/2020",
      duration: "0:32",
      location: "Athina, Kolonaki",
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
          <div className={classes.Money}>25.33 $</div>
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
            Here you can see the last 10 charging times you also used our Platform.
          </DialogContentText>
          <TableContainer component={Box}>
            <Table size='small' align>
              <TableHead>
                <TableRow className={classes.Header}>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Charging</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                </TableRow>
              </TableHead>
              {timeData.map((data) => (
                <TableBody>
                  <TableRow className={classes.Row}>
                    <TableCell>{data.date}</TableCell>
                    <TableCell>{data.duration}</TableCell>
                    <TableCell>{data.location}</TableCell>
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
              value={state.creditCard}
              name='creditCard'
              type='text'
              label='Credit Card'
              variant='outlined'
              required={true}
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.cardHolder.toUpperCase()}
              name='cardHolder'
              type='text'
              label='Card_Holder'
              required={true}
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.expirationDate}
              name='expirationDate'
              type='text'
              label='Expires'
              required={true}
              variant='outlined'
              onChange={(event) => inputHandler(event)}
            />
            <StyledTextField
              value={state.cvv}
              required={true}
              name='cvv'
              label='CVV'
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
