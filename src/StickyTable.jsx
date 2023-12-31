import * as React from 'react'
import moment from 'moment/moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import fetchData from './fetchData';
const data = fetchData()

const columns = [
  { id: 'id', label: 'No', minWidth: 100 },
  { id: 'temperature', label: 'Temperature', minWidth: 100 },
  {
    id: 'humidity',
    label: 'Humidity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'chemical_consentration',
    label: 'Chemical Consentration',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'pH',
    label: 'pH',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'amperage',
    label: 'Amperage',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 170,
    align: 'center',
  },
];

function createData(id, temperature, humidity, chemical_consentration, pH, amperage, time) {
  return { id, temperature, humidity, chemical_consentration, pH, amperage, time };
}

const rows = [];

data.then((data) => data.data.map((list, index) => {
  const newTime = moment(list.created_at).format('DD-MMMM-YYYY, H:mm:ss');
  rows.push(
    createData(index + 1, list.temperature, list.humidity, list.chemical_consentration, list.pH, list.amperage, newTime)
  )
}))

export default function StickyTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer><TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </>
  );
}
