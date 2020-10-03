import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "../../AxiosBase";
import Product from "./Product/Product";
import classes from "./Products.module.css";
import { data } from "./Points";

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <Grid container>
        {data.map((product) => (
          <Grid className={classes.focus} key={product.date} style={{ marginBottom: "2%" }} item container xs={12} md={6} lg={4} justify='center'>
            <Product loc={product.loc} title={product.title} date={product.date} image={product.image} content={product.content} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
