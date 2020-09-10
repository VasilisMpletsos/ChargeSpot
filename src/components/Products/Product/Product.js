import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import classes from "./Product.module.css";
import { Grid } from "@material-ui/core";

const Product = (props) => {
  return (
    <Card className={classes.Product}>
      <CardHeader title={props.title} subheader={props.date} />
      <div className={classes.Image}>
        <img src={props.image}></img>
      </div>

      <CardContent>
        <Grid container>
          <Grid item xs={6} className={classes.Table} container justify='center'>
            {props.content.typeC} x Type C Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center'>
            {props.content.typeA} x Type A Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center'>
            {props.content.wheel} x Wheel Chair Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center'>
            {props.content.typeB} x Type B Ports
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Product;
