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

const ENDPOINT = "https://ec2-35-176-175-106.eu-west-2.compute.amazonaws.com:5000";

const Settings = (props) => {
  const darkState = useSelector((state) => state.prefersDark);
  const auth = useSelector((state) => state.auth);

  let show;
  if (auth) {
    show = (
      <List>
        <ListItem>
          <Button startIcon={<TimelineIcon />}>Usage History</Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<AccountBalanceIcon />}>Account Balance</Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<CreditCardIcon />}>Change Credit Card</Button>
        </ListItem>
      </List>
    );
  } else {
    show = <div></div>;
  }

  const [connectedUsers, setConnectedUsers] = useState("-");

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
    <Drawer variant='persistent' anchor='right' open={props.open}>
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
        {show}
        <ListItem>
          <BatteryCharging20Icon />
          <ListItemText>{connectedUsers} people charging</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Settings;
