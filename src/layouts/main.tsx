import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '~/components/header';
import { Context } from '~/contexts/app';

export default function MainLayout() {
  const { message } = useContext(Context);
  return (
    <>
      <Header />
      <main>
        {message ? (
          <div className='alerts-container'>
            <Alert variant='filled' severity='warning'>
              {message}
            </Alert>
          </div>
        ) : (
          ''
        )}
        <Outlet />
      </main>
    </>
  );
}
