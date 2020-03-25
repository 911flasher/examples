import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

function createData(name, value, ) {
  return { name, value};
}

AcccessibleTable.propTypes = {
  info: PropTypes.func.isRequired,
};

export default function AcccessibleTable() {
  const classes = useStyles();
  
  const info = {
    id: "10",
  author: "Paul Jarvis",
  width: 2500,
  height: 1667,
  url: "https://unsplash.com/photos/6J--NXulQCs",
  download_url: "https://picsum.photos/id/10/2500/1667" }//this.props.info;
  const { author, id, width, height, url, download_url} = info;
  const rows = [
    createData('author',author),
    createData('id',id),
    createData('url',url),
    createData('download_url',download_url),
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
              <TableCell align="right">Tittle</TableCell>
              <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
