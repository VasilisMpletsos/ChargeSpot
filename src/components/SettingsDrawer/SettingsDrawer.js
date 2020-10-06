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
import { withStyles } from "@material-ui/core/styles";
import classes from "./SettingsDrawer.module.css";

const ENDPOINT = "https://ec2-35-176-175-106.eu-west-2.compute.amazonaws.com:5000";

const Settings = (props) => {
  const darkState = useSelector((state) => state.prefersDark);
  const auth = useSelector((state) => state.auth);

  const [connectedUsers, setConnectedUsers] = useState("-");

  const [dialogState, setDialogState] = useState(false);

  const toggleAccountDialog = (state) => {
    setDialogState(state);
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
          <Button startIcon={<TimelineIcon />}>Usage History</Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<AccountBalanceIcon />} onClick={() => toggleAccountDialog(true)}>
            Account Balance
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<CreditCardIcon />}>Change Credit Card</Button>
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

  return (
    <div>
      <Drawer variant='persistent' anchor='right' open={props.open}>
        {show}
      </Drawer>
      <Dialog onClose={() => toggleAccountDialog(false)} aria-labelledby='accountDialog' open={dialogState}>
        <DialogTitle id='accountDialog'>Account Balance</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.DialogContent} id='alert-dialog-description'>
            Here you can see your purchased time to charge. Thanks for using our platform and helping the enviroment by charging with 100% rebewable
            energy.
          </DialogContentText>
        </DialogContent>
        <div className={classes.Money}>25.33 $</div>
        <DialogActions>
          <Button onClick={() => toggleAccountDialog(false)} color='primary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
