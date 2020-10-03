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
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";
import classes from "./Products.module.css";

const Products = () => {
  const data = [
    {
      loc: "https://www.google.com/maps/@38.899626,22.4336409,20.04z",
      title: "Λαμία, Πλατεία Πάρκου",
      date: "17 Semptember 2020",
      image: image2,
      content: {
        typeA: 5,
        typeB: 2,
        typeC: 9,
        wheel: 3,
      },
    },
    {
      loc: "https://www.google.com/maps/@40.606982,22.9515786,17z",
      title: "Θεσσαλονίκη, Λιμάνι",
      date: "20 January 2013",
      image: image1,
      content: {
        typeA: 5,
        typeB: 2,
        typeC: 9,
        wheel: 3,
      },
    },
    {
      loc: "https://www.google.com/maps/@40.6149199,22.9730595,19.13z",
      title: "Θεσσαλονίκη, Τούμπα",
      date: "22 August 2015",
      image: image3,
      content: {
        typeA: 0,
        typeB: 1,
        typeC: 0,
        wheel: 2,
      },
    },
    {
      loc: "https://www.google.com/maps/@37.952012,23.699959,21z",
      title: "Αθήνα, Καλλιθέα",
      date: "8 August 2020",
      image: image4,
      content: {
        typeA: 1,
        typeB: 1,
        typeC: 4,
        wheel: 0,
      },
    },
    {
      loc: "https://www.google.com/maps/dir//37.9794083,23.7415545/@37.9794213,23.741503,20z/data=!4m2!4m1!3e3",
      title: "Αθήνα, Κολωνάκι",
      date: "15 August 2020",
      image: image5,
      content: {
        typeA: 2,
        typeB: 2,
        typeC: 3,
        wheel: 4,
      },
    },
    {
      loc: "https://www.google.com/maps/@38.899626,22.4336409,20.04z",
      title: "Θεσσαλονίκη, Λιμάνι",
      date: "20 January 2018",
      image: image6,
      content: {
        typeA: 8,
        typeB: 7,
        typeC: 8,
        wheel: 0,
      },
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
          <Grid className={classes.focus} key={product.date} style={{ marginBottom: "2%" }} item container xs={12} md={6} lg={4} justify='center'>
            <Product loc={product.loc} title={product.title} date={product.date} image={product.image} content={product.content} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
