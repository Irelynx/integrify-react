import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Context } from '~/contexts/app';

import ChevronRight from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

export default function Countries() {
  const { filteredCountries, message, countries } = useContext(Context);

  type Country = Exclude<typeof filteredCountries, null>[number];
  type SortOrder = 'asc' | 'desc';
  type HeaderI = {
    name: string;
    sortComparator?: (order: SortOrder) => (a: Country, b: Country) => number;
    template: (country: Country) => React.ReactNode;
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderBy, setOrderBy] = useState<HeaderI>();
  const [order, setOrder] = useState<SortOrder>('asc');
  const [sortedCountries, setSortedCountries] =
    useState<typeof filteredCountries>(filteredCountries);

  useEffect(() => {
    console.log('sort', orderBy, !!orderBy?.sortComparator, order);
    if (orderBy && orderBy.sortComparator && order) {
      const copy = filteredCountries?.slice();
      copy?.sort(orderBy.sortComparator(order));
      setSortedCountries(copy || filteredCountries);
    } else {
      setSortedCountries(filteredCountries);
    }
  }, [order, orderBy, filteredCountries]);

  const navigate = useNavigate();

  const headers: Array<HeaderI> = [
    {
      name: 'Flag',
      template: (country) => (
        <div style={{ textAlign: 'center' }}>
          <img height={60} src={country.flags.svg} alt={country.flags.alt || ''} />
        </div>
      ),
    },
    {
      name: 'Name',
      sortComparator: (order) => {
        const direction = order === 'asc' ? 1 : -1;
        return (a, b) => {
          if (a.name.common > b.name.common) {
            return direction;
          }
          if (a.name.common < b.name.common) {
            return -direction;
          }
          return 0;
        };
      },
      template: (country) => <>{country.name.common}</>,
    },
    {
      name: 'Region',
      sortComparator: (order) => {
        const direction = order === 'asc' ? 1 : -1;
        return (a, b) => {
          if (a.region > b.region) {
            return direction;
          }
          if (a.region < b.region) {
            return -direction;
          }
          return 0;
        };
      },
      template: (country) => <>{country.region}</>,
    },
    {
      name: 'Population',
      sortComparator: (order) => {
        const direction = order === 'asc' ? 1 : -1;
        return (a, b) => {
          if (a.population > b.population) {
            return direction;
          }
          if (a.population < b.population) {
            return -direction;
          }
          return 0;
        };
      },
      template: (country) => <>{country.population}</>,
    },
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

  function handleSetOrderBy(header: HeaderI) {
    if (orderBy?.name === header.name) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(header);
      setOrder('asc');
    }
    setPage(0);
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
              {headers.map((header, index) =>
                header.sortComparator ? (
                  <TableCell
                    key={index}
                    sortDirection={orderBy?.name === header.name ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy?.name === header.name}
                      direction={orderBy?.name === header.name ? order : 'asc'}
                      onClick={() => handleSetOrderBy(header)}
                    >
                      {header.name}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={index}>{header.name}</TableCell>
                ),
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCountries?.length ? (
              sortedCountries
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
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length + 1}>
                  {countries?.length ? 'Nothing to show' : 'Loading...'}
                </TableCell>
              </TableRow>
            )}
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
