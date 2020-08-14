import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  sideImage: {
    width: "300px",
    height: "200px",
    borderRadius: 15,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    float: 'left',
    marginRight: "2%",
    '& img': {
      width: "100%",
      height: "100%",
      borderRadius: 15,
    },
  },
  home:{
    width: "100%",
    height: "100%",
  },
});

export default function Menu(){
    const classes = useStyles();
    return(
      <div>
      <Container>
        <h1>Home</h1>
        <div className={classes.home}>
          <div className={classes.sideImage}>
            <img alt="Charge Spot Design" src={"./chargeSpot.jpg"}/>
          </div>
          <Typography >Charge Spot is a project to be constructed in the port of Thessaloniki</Typography>
        </div>
      </Container>
      </div>
    )
  }
