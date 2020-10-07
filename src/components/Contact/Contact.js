import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import classes from "./Contact.module.css";
import Paper from "@material-ui/core/Paper";

const Contact = () => (
  <div>
    <Paper>
      <h1 className={classes.Title}>Contact</h1>
      <Grid container alignItems='center' direction='row'>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          Phone: +30-69944048324
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          Email: mpletsos@ece.auth.gr
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          Address: Lykaonias (17-19)
        </Grid>
        <Grid className={classes.Contact} item xs={12} sm={6}>
          ZipCode: 35100
        </Grid>
      </Grid>
    </Paper>
  </div>
);

export default Contact;
