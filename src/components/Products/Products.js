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
import sea from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import classes from "./Products.module.css";

const Products = () => {
  const data = [
    {
      title: "Lamia",
      subheader: "17 Semptember 2020",
      image: image2,
      content: "Is this gonna really work i don't know!",
    },
    {
      title: "Thessaloniki",
      subheader: "20 January 2013",
      image: sea,
      content: "Maybe yes",
    },
  ];
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   console.log(rows);
  //   axios.get("/products").then((response) => {
  //     setRows(response.data);
  //   });
  // }, []);

  return (
    <div>
      <h1>Products</h1>
      <Grid container>
        {data.map((product) => (
          <Grid item container xs={12} md={4} justify='center'>
            <Product
              title={product.title}
              subheader={product.subheader}
              image={product.image}
              content={product.content}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
