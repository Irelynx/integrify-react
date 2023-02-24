import React, { useEffect, useState } from 'react';
import api from '~/api';
import { Country } from '~/api/types';

export interface AppContext {
  countries: Country[] | null;
  setCountries: React.Dispatch<React.SetStateAction<AppContext['countries']>>;
  filteredCountries: AppContext['countries'];
  setFilteredCountries: React.Dispatch<React.SetStateAction<AppContext['filteredCountries']>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<AppContext['query']>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function mockFunction() {}

export const Context = React.createContext<AppContext>({
  countries: null,
  setCountries: mockFunction,
  filteredCountries: null,
  setFilteredCountries: mockFunction,
  query: '',
  setQuery: mockFunction,
});

export function AppContextDOM({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<AppContext['countries']>([]);
  const [filteredCountries, setFilteredCountries] = useState<AppContext['filteredCountries']>([]);
  const [query, setQuery] = useState<AppContext['query']>('');

  async function reload(force = false) {
    setCountries(await api.getAll(force));
  }

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (query && countries) {
      const q = query.toLowerCase();
      setFilteredCountries(
        countries.filter((country) => {
          if (
            country.cca3.toLowerCase().includes(q) ||
            country.cca2.toLowerCase().includes(q) ||
            country.name.common.toLowerCase().includes(q) ||
            country.name.official.toLowerCase().includes(q)
          )
            return true;
          // TODO: complex search, also inside translations
          return false;
        }),
      );
    } else {
      setFilteredCountries(countries);
    }
  }, [countries, query]);

  return (
    <Context.Provider
      value={{
        countries,
        setCountries,
        filteredCountries,
        setFilteredCountries,
        query,
        setQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
}
