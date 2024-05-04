import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';

const thinBorderStyles = makeStyles({
  table: {
    // minWidth: 650,
    borderCollapse: 'collapse',
    '& th, & td': {
      border: '1px solid rgba(224, 224, 224, 1)',
    },
    // height:'240px',
    // overflow:'auto'
  },
});


export default function CustomTable({ columns, rows }) {
  const classes = thinBorderStyles();

  return (
    <TableContainer component={Paper} sx={{'& .MuiPaper-elevation4':{boxShadow:"none"}}}>
      <Table className={classes.table} aria-label="thin line table" >
        <TableHead >
          <TableRow>
             {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
              rows.map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                         {column.id === 'options' && column.render // Check if the column is 'options' and has a render function
                        ? column.render(row) // Pass the row data to the render function
                        : column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ padding: '16px',fontWeight: 'bold'}}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
