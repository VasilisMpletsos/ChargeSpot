import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import classes from "./Contact.module.css";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const StyledTypography = withStyles({
  root: {
    fontFamily: "Nothing You Could Do",
    fontSize: "35px",
    paddingBottom: "2%",
    "@media (max-width:500px)": {
      fontSize: "25px",
    },
  },
})(Typography);

const Contact = () => (
  <div>
    <Paper>
      <h1 className={classes.Title}>Contact</h1>
      <Grid container alignItems='center' direction='row'>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          <StyledTypography> Phone: +30-69944048324</StyledTypography>
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          <StyledTypography>Email: mpletsos@ece.auth.gr</StyledTypography>
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          <StyledTypography>Address: Lykaonias (17-19)</StyledTypography>
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          <StyledTypography>ZipCode: 35100</StyledTypography>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

export default Contact;
