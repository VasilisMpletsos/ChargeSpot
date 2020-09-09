import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const check = [
  {
    name: "Agrilia",
    calories: 20,
    fat: "Type C + Type B",
    carbs: 5,
    protein: "Yes",
  },
  {
    name: "Lamia",
    calories: 20,
    fat: "Type C + Type B",
    carbs: 5,
    protein: "Yes",
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Products = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(rows);
    // Dont use check but fetch data from Server
    setRows(check);
  }, []);

  const classes = useStyles();
  return (
    <div>
      <h1>Products</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Place</StyledTableCell>
              <StyledTableCell align='right'>Watt (W)</StyledTableCell>
              <StyledTableCell align='right'>Plug Type</StyledTableCell>
              <StyledTableCell align='right'>Count</StyledTableCell>
              <StyledTableCell align='right'>Fast Charge</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.calories}</StyledTableCell>
                <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                <StyledTableCell align='right'>{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
