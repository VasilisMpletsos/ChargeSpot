import React , { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import classes from "./Products.module.css";
import { data } from "./Points";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Products = () => {
  //Redux Store
  let auth = useSelector((state) => state.auth);

  return (
    <div>
      {auth ? (<Fragment><h1 className={classes.Title}>Products</h1>
      <Grid container>
        {data.map((product) => (
          <Grid className={classes.focus} key={product.date} style={{ marginBottom: "2%" }} item container xs={12} md={6} lg={4} justify='center'>
            <Product loc={product.loc} title={product.title} date={product.date} image={product.image} content={product.content} />
          </Grid>
        ))}
      </Grid></Fragment>) : <Redirect to='/login' />}
    </div>
  );
};

export default Products;
