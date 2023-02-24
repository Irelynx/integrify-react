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

import ChevronRight from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

export default function Countries() {
  const { filteredCountries } = useContext(Context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const headers: Array<{
    name: string;
    template: (country: Exclude<typeof filteredCountries, null>[number]) => React.ReactNode;
  }> = [
    {
      name: 'Flag',
      template: (country) => (
        <div style={{ textAlign: 'center' }}>
          <img height={60} src={country.flags.svg} alt={country.flags.alt || ''} />
        </div>
      ),
    },
    { name: 'Name', template: (country) => <>{country.name.common}</> },
    { name: 'Region', template: (country) => <>{country.region}</> },
    { name: 'Population', template: (country) => <>{country.population}</> },
    {
      name: 'Languages',
      template: (country) =>
        country.languages ? (
          <ul>
            {Object.keys(country.languages).map((lang) => (
              <li key={lang}>{country.languages![lang]}</li>
            ))}
          </ul>
        ) : (
          ''
        ),
    },
  ];

  function handleRowClick(
    _event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Exclude<typeof filteredCountries, null>[number],
  ) {
    navigate(`country/${row.cca3}`);
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((country) => (
                <TableRow
                  hover
                  style={{ cursor: 'pointer' }}
                  key={country.cca3}
                  onClick={(event) => handleRowClick(event, country)}
                >
                  {headers.map((header, index) => {
                    return (
                      <TableCell component='th' scope='row' key={index}>
                        {header.template(country)}
                      </TableCell>
                    );
                  })}

                  <TableCell>
                    <ChevronRight />
                  </TableCell>
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
