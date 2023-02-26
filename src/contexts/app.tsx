import React, { useEffect, useState } from 'react';
import api, { APIError } from '~/api';
import { Country } from '~/api/types';

export interface AppContext {
  countries: Country[] | null;
  setCountries: React.Dispatch<React.SetStateAction<AppContext['countries']>>;
  filteredCountries: AppContext['countries'];
  setFilteredCountries: React.Dispatch<React.SetStateAction<AppContext['filteredCountries']>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<AppContext['query']>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<AppContext['message']>>;
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
  message: '',
  setMessage: mockFunction,
});

export function AppContextDOM({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<AppContext['countries']>([]);
  const [filteredCountries, setFilteredCountries] = useState<AppContext['filteredCountries']>([]);
  const [query, setQuery] = useState<AppContext['query']>('');
  const [message, setMessage] = useState('');

  async function reload(force = false) {
    try {
      const data = await api.getAll(force);
      if (data.length === 0) {
        setMessage('Data is not available');
      } else {
        setMessage('');
      }
      setCountries(data);
    } catch (e) {
      if (e instanceof APIError) {
        setMessage(e.message);
      } else if (e instanceof Error) {
        setMessage(e.message);
      }
      setCountries(null);
    }
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
        message,
        setMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}
