import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import classes from "./Product.module.css";

const Product = (props) => {
  return (
    <Card className={classes.Product}>
      <CardHeader title={props.title} subheader={props.subheader} />
      <div className={classes.Image}>
        <img src={props.image}></img>
      </div>
      <CardContent>{props.content}</CardContent>
    </Card>
  );
};

export default Product;
