import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Typography from '@material-ui/core/Typography';

const Settings = (props) => {

    return(
    <Drawer variant="persistent" anchor="right" open={props.open}>
        <List>
            <ListSubheader component="div" id="nested-list-subheader">
            <Button onClick={props.close} startIcon={<BackspaceIcon/>}></Button>
                Settings
            </ListSubheader>
          <Divider/>
          <ListItem>
            <Switch onClick={props.darkMode}></Switch>
            <ListItemText primary="Dark Mode" />
          </ListItem>
          <ListItem>
            <Button startIcon={<TimelineIcon/>}>Usage History</Button>
          </ListItem>
          <ListItem>
            <Button startIcon={<AccountBalanceIcon/>}>Account Balance</Button>
          </ListItem>
          <ListItem>
            <Button startIcon={<CreditCardIcon/>}>Change Credit Card</Button>
          </ListItem>
        </List>
    </Drawer>
    )
}

export default Settings;




