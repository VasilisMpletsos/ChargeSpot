import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classes from "./Home.module.css";
import { withStyles } from "@material-ui/core/styles";

const StyledTypography = withStyles({
  root: {
    fontFamily: "Nothing You Could Do",
    fontSize: "30px",
    textAlign: "justify",
    paddingBottom: "2%",
    "@media (max-width:500px)": {
      fontSize: "22px",
    },
  },
})(Typography);

const Home = () => {
  return (
    <div>
      <Paper>
        <h1 className={classes.Title}>Home</h1>
        <div className={classes.main}>
          <StyledTypography variant='body1'>
            Hello we are <b>Chargespot</b> a Thessaloniki based company! Welcome to our app, here you can find a ChargeSpot near you and charge
            whatever device you wish, you just have to:
            <ol>
              <li>Find matching port</li>
              <li>Scan QR Code</li>
              <li>Insert Credit Card Info</li>
              <b>
                <li>Start Charging</li>
              </b>
            </ol>
            Thank you for helping the enviroment by charging with completely renewable generated energy!
          </StyledTypography>
          <div className={classes.Signature}>- ChargeSpot Team </div>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
