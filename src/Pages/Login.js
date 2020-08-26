import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Login(){
  const classes = useStyles();
  return(
    <Container>
      <h1>Login</h1>
      <Typography >Plese Login to proceed</Typography>
    </Container>
  )
}
