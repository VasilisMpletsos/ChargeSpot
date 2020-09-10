import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import classes from "./Product.module.css";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PlaceIcon from "@material-ui/icons/Place";

const openLoc = (location) => {
  window.open(location, "_blank");
};

const StyledCard = withStyles({
  root: {
    width: "90%",
    height: "600px",
    boxShadow: "5px 7px 15px grey",
  },
})(Card);

const StyledPlaceIcon = withStyles({
  root: {
    fontSize: 35,
  },
})(PlaceIcon);

const Product = (props) => {
  return (
    <StyledCard key={props.title}>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              console.log(props.loc);
              openLoc(props.loc);
            }}
          >
            <StyledPlaceIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.date}
      />
      <div className={classes.Image}>
        <img src={props.image}></img>
      </div>

      <CardContent>
        <Grid container>
          <Grid item xs={6} className={classes.Table} container justify='center' alignItems='center'>
            {props.content.typeC} x Type C Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center' alignItems='center'>
            {props.content.typeA} x Type A Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center' alignItems='center'>
            {props.content.wheel} x Wheel Chair Ports
          </Grid>
          <Grid item xs={6} className={classes.Table} container justify='center' alignItems='center'>
            {props.content.typeB} x Type B Ports
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default Product;
