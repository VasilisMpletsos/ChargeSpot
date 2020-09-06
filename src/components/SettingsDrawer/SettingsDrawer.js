import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

const Settings = (props) => {

    return(
    <Drawer variant="persistent" anchor="right" open={props.open}>
        <List>
          <ListItem>
            <Button onClick={props.close} startIcon={<ArrowBackIcon/>} color='primary' variant='contained'> Close Settings</Button>
          </ListItem>
          <Divider/>
          <ListItem>
            <Switch onClick={props.darkMode}></Switch>
            <ListItemText primary="Dark Mode" />
          </ListItem>
        </List>
    </Drawer>
    )
}

export default Settings;




