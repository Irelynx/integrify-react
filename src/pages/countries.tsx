import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '~/contexts/app';

export default function Countries() {
  const { filteredCountries } = useContext(Context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const headers = [{ name: 'Name', path: 'name.common' }];

  function handleRowClick(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Exclude<typeof filteredCountries, null>[number],
  ) {
    // event, row;
  }

  function handleSetPage(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  function handleSetRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }
  // return <>{filteredCountries?.length}</>;
  return (
    <>
      <TableContainer>
        <Table size='medium' aria-labelledby='Countries table'>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((country) => (
                <TableRow
                  hover
                  key={country.cca3}
                  onClick={(event) => handleRowClick(event, country)}
                >
                  <TableCell component='th' scope='row'>
                    {country.name.official}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredCountries?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleSetPage}
        onRowsPerPageChange={handleSetRowsPerPage}
      />
    </>
  );
}
